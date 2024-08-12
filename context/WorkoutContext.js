import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DatabaseContext } from "./DataContext";
import {
  getSetsOfExercise,
  getTable,
  insertSets,
  insertWorkout,
  isWorkoutRecordedThisWeek,
  updateXp,
} from "../database/database";
import { ProgressContext } from "./ProgressContext";
import { REWARDS } from "../src/utility/rewards";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const WorkoutContext = createContext();

export const WorkoutContextProvider = ({ children }) => {
  const [planId, setPlanId] = useState("");
  const [nextSet, setNextSet] = useState(null);
  const [showRestTime, setShowRestTime] = useState(false);
  const INITIAL_REST_TIME = 35;
  const [plan, setPlan] = useState({});
  const [exercises, setExercises] = useState([]);
  const [sets, setSets] = useState({});
  const [timePassed, setTimePassed] = useState(0);
  const [activeWorkout, setActiveWorkout] = useState(false);
  const [showAfterWorkout, setShowAfterWorkout] = useState(false);
  const [firstInWeek, setFirstInWeek] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayEndTime, setOverlayEndTime] = useState(INITIAL_REST_TIME);
  const [setsNumber, setSetsNumber] = useState(0);
  const { getPlan, getPlanExcercise, updateWorkouts } =
    useContext(DatabaseContext);
  const { reloadXp } = useContext(ProgressContext);
  async function prepareSets(exercises) {
    // object keys should be the exerciseId for each exercise
    const preparedSets = {};
    for (const exercise of exercises) {
      const list = [];
      const sets = await getSetsOfExercise(exercise.exerciseId);

      for (const set of sets) {
        list.push(set);
      }

      preparedSets[exercise.exerciseId] = list;
    }
    setSets(preparedSets);
  }

  function getNextSet(id) {
    let nextSet = null;

    // Iterate through each exercise
    const exercises = Object.keys(sets);
    for (let i = 0; i < exercises.length; i++) {
      const exercise = exercises[i];

      // Iterate through each set within the exercise
      for (let j = 0; j < sets[exercise].length; j++) {
        if (sets[exercise][j].id == id) {
          // If it's not the last set in the current exercise, return the next set
          if (j != sets[exercise].length - 1) {
            return sets[exercise][j + 1];
          }

          // If it's the last set in the current exercise, check the next exercise
          if (i != exercises.length - 1) {
            const nextExercise = exercises[i + 1];
            return sets[nextExercise][0];
          }

          // If there's no next set, return null
          return null;
        }
      }
    }

    return nextSet;
  }

  function startOverlay(exerciseId) {
    if (showRestTime) {
      const nextSet = getNextSet(exerciseId);
      setNextSet(nextSet);
      setShowOverlay(true);
    }
  }
  async function restTime() {
    let showRestTimeList = await AsyncStorage.getItem("showRestTimeList");
    showRestTimeList = JSON.parse(showRestTimeList);
    if (showRestTimeList != null) {
      for (let i = 0; i < showRestTimeList.length; i++) {
        if (showRestTimeList[i].planId == plan.id) {
          setShowRestTime(showRestTimeList[i].showRestTime);
          break;
        }
      }
    }
  }
  useMemo(() => {
    restTime();
  }, [plan]);
  function reset() {
    setNextSet(null);
    setShowRestTime(false);
    setSetsNumber(0);
    setOverlayEndTime(INITIAL_REST_TIME);
    setTimePassed(0);
    setPlanId("");
    setPlan({});
    setExercises([]);
    setSets({});
  }
  async function saveSets(workoutId) {
    let numberOfSets = 0;
    // for every exercise in the exercises array

    for (const exercise of exercises) {
      // for every set in the set array
      for (const set of sets[exercise.exerciseId]) {
        // insert the set into the database
        if (set.checked) {
          numberOfSets++;
          await insertSets(
            exercise.exerciseId,
            set.reps,
            set.weight,
            set.type,
            set.difficulty,
            planId,
            workoutId,
            new Date()
          );
        }
      }
    }
    setSetsNumber(numberOfSets);
    await updateXp(REWARDS.WORKOUT_FINISH_REWARD + numberOfSets);

    reloadXp();
  }
  function cancel() {
    setActiveWorkout(false);
    reset();
  }
  async function save(timePassed) {
    let setsAdded = false;
    Object.keys(sets).forEach((exerciseId) => {
      if (sets[exerciseId].length > 0) {
        setsAdded = true;
      }
    });
    if (setsAdded) {
      const workoutId = await insertWorkout(
        timePassed,
        "notes",
        new Date(),
        planId
      );
      const isWorkoutThisWeek = await isWorkoutRecordedThisWeek(workoutId);
      if (!isWorkoutThisWeek) {
        await updateXp(REWARDS.WEEKLY_WORKOUT_REWARD);

        setFirstInWeek(true);
      }
      await saveSets(workoutId);
      setTimePassed(0);
      setActiveWorkout(false);
      reset();
      updateWorkouts();

      return true;
    }
    return true;
  }

  function userHasCheckedSets() {
    for (const exercise of exercises) {
      for (const set of sets[exercise.exerciseId]) {
        if (set.checked) {
          return true;
        }
      }
    }
    return false;
  }
  function removeSet(exerciseId, id) {
    // remove the set from the sets array
    const newSets = { ...sets };
    newSets[exerciseId] = newSets[exerciseId].filter((set) => set.id !== id);
    setSets(newSets);
  }
  async function addExercise(exercise) {
    setExercises([...exercises, exercise]);
    setSets({ ...sets, [exercise.exerciseId]: [] });
  }
  useEffect(() => {
    // console.log(sets);
  }, [sets]);

  useEffect(() => {
    async function getInfo(id) {
      try {
        const data = await getPlanExcercise(id);
        const plan = await getPlan(id);
        setExercises(data);
        await prepareSets(data);
        setPlan(plan);
      } catch (error) {
        // console.log(error);
      }
    }

    getInfo(planId);
  }, [planId]);
  return (
    <WorkoutContext.Provider
      value={{
        plan,
        exercises,
        planId,
        setPlanId,
        sets,
        setSets,
        save,
        timePassed,
        setTimePassed,
        setActiveWorkout,
        activeWorkout,
        cancel,
        userHasCheckedSets,
        removeSet,
        setExercises,
        addExercise,
        setShowAfterWorkout,
        showAfterWorkout,
        firstInWeek,
        setFirstInWeek,
        setsNumber,
        setSetsNumber,
        startOverlay,
        setOverlayEndTime,
        showOverlay,
        setShowOverlay,
        overlayEndTime,
        showRestTime,
        setShowRestTime,
        nextSet,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
