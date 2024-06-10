import { createContext, useContext, useEffect, useState } from "react";
import { DatabaseContext } from "./DataContext";
import { getTable, insertSets, insertWorkout } from "../database/database";

export const WorkoutContext = createContext();

export const WorkoutContextProvider = ({ children }) => {
  const [planId, setPlanId] = useState("");
  const [plan, setPlan] = useState({});
  const [exercises, setExercises] = useState([]);
  const [sets, setSets] = useState({});

  const { getPlan, getPlanExcercise } = useContext(DatabaseContext);
  function prepareSets(exercises) {
    // object keys should be the exerciseId for each exercise
    const preparedSets = {};
    for (const exercise of exercises) {
      preparedSets[exercise.exerciseId] = [];
    }
    setSets(preparedSets);
  }
  function reset(params) {
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
    console.log("sets saved");
    console.log(await getTable("sets"));
  }

  async function save(timePassed) {
    const workoutId = await insertWorkout(
      timePassed,
      "notes",
      new Date(),
      planId
    );
    await saveSets(workoutId);
    console.log("workout saved");
    return true;
  }

  useEffect(() => {
    async function getInfo() {
      try {
        const data = await getPlanExcercise(planId);
        const plan = await getPlan(planId);
        setExercises(data);
        prepareSets(data);
        setPlan(plan);
      } catch (error) {}
    }

    getInfo();
  }, [planId]);
  return (
    <WorkoutContext.Provider
      value={{ plan, exercises, planId, setPlanId, sets, setSets, save }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
