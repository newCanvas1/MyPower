import { createContext, useContext, useEffect, useState } from "react";
import { DatabaseContext } from "./DataContext";
import {
  getSetsOfExercise,
  getTable,
  insertSets,
  insertWorkout,
} from "../database/database";

export const WorkoutContext = createContext();

export const WorkoutContextProvider = ({ children }) => {
  const [planId, setPlanId] = useState("");
  const [plan, setPlan] = useState({});
  const [exercises, setExercises] = useState([]);
  const [sets, setSets] = useState({});
  const [timePassed, setTimePassed] = useState(0);
  const [activeWorkout, setActiveWorkout] = useState(false);
  const { getPlan, getPlanExcercise } = useContext(DatabaseContext);
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
  function reset() {
    setTimePassed(0);
    setPlanId("");
    setPlan({});
    setExercises([]);
    setSets({});
  }
  async function saveSets(workoutId) {
    // for every exercise in the exercises array
    for (const exercise of exercises) {
      // for every set in the set array
      for (const set of sets[exercise.exerciseId]) {
        // insert the set into the database
        await insertSets(
          exercise.exerciseId,
          set.reps,
          set.weight,
          set.type,
          planId,
          workoutId
        );
      }
    }
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
      await saveSets(workoutId);
      setTimePassed(0);
      console.log("workout saved");
      setActiveWorkout(false);
      reset();

      return true;
    }
    return true;
  }

  useEffect(() => {
    async function getInfo() {
      try {
        const data = await getPlanExcercise(planId);
        const plan = await getPlan(planId);
        setExercises(data);
        await prepareSets(data);
        setPlan(plan);
      } catch (error) {
        console.log(error);
      }
    }

    getInfo();
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
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
