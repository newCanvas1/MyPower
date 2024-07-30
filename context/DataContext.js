import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getTable,
  insertPlan,
  deletePlanFromDatabase,
  insertExercise,
  insertPlanExcercise,
  getPlansExercise,
  deletePlanExcerciseFromDatabase,
  updatePlanName,
  getExerciseById,
  getPlanInfo,
  getWorkouts,
  deleteWorkoutFromDatabase,
  getCharts,
} from "../database/database";
export const DatabaseContext = createContext(null);

export const DatabaseProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [excerciseToAdd, setExcerciseToAdd] = useState([]);
  const [updateExercises, setUpdateExercises] = useState(false);
  const [chartExercises, setChartExercises] = useState([]);
  useEffect(() => {
    getTable("plans").then((data) => {
      setPlans(data);
    });
    getTable("exercises").then((data) => {
      setExercises(data);
    });
    getAllWorkouts().then((data) => {
      setWorkouts(data);
    });
    getCharts().then((data) => {
      setChartExercises(data);
    });
  }, []);
  // add plan to database
  const addPlan = async (plan) => {
    const result = await insertPlan(
      plan.name,
      plan.icon,
      plan.description,
      plan.color
    );
    // update plans
    for (const excercise of excerciseToAdd) {
      await insertPlanExcercise(result.lastInsertRowId, excercise.exerciseId);
    }
    setExcerciseToAdd([]);
    setPlans([...plans, { ...plan, id: result.lastInsertRowId }]);
  };

  // delete plan from database
  const deletePlan = async (id) => {
    const deleted = await deletePlanFromDatabase(id);
    if (deleted) setPlans(plans.filter((plan) => plan.id !== id));
  };

  // add excercise to database
  const addExercise = async (exercise) => {
    const result = await insertExercise(
      exercise.name,
      exercise.icon,
      exercise.description,
      exercise.notes,
      exercise.category
    );
    // update exercises
    setExercises([
      ...exercises,
      { ...exercise, exerciseId: result.lastInsertRowId },
    ]);
    // setUpdateExercises(!updateExercises);
    reloadExercises();
    return result.lastInsertRowId;
  };

  // get planExcercise
  const getPlanExcercise = async (planId) => {
    const data = await getPlansExercise(planId);
    return data;
  };
  // delete planExcercise
  const deletePlanExcercise = async (id) => {
    const deleted = await deletePlanExcerciseFromDatabase(id);

    return deleted;
  };

  const changePlanName = async (id, name) => {
    const result = await updatePlanName(id, name);
    if (result)
      setPlans(plans.map((plan) => (plan.id == id ? { ...plan, name } : plan)));
  };
  const getExercise = async (id) => {
    const data = await getExerciseById(id);
    return data;
  };

  const getSortedExercises = async () => {
    const exercises = {};
    const data = await getTable("exercises");
    for (const exercise of data) {
      exercises[exercise.category] = [
        ...(exercises[exercise.category] || []),
        exercise,
      ];
    }
    return exercises;
  };

  const addExerciseToPlan = async (planId, exerciseId) => {
    const result = await insertPlanExcercise(planId, exerciseId);
    return result;
  };
  const getPlan = async (id) => {
    const data = await getPlanInfo(id);
    return data;
  };
  const getAllWorkouts = async () => {
    const data = await getWorkouts();
    return data;
  };
  const deleteWorkout = async (workoutId) => {
    const deleted = await deleteWorkoutFromDatabase(workoutId);
    if (deleted)
      setWorkouts(
        workouts.filter((workout) => workout.workout.workoutId !== workoutId)
      );
      updateWorkouts();
  };

  function updateWorkouts() {
    getAllWorkouts().then((data) => {
      setWorkouts(data);
    });
  }
  function reloadExercises() {
    getTable("exercises").then((data) => {
      setExercises(data);
    });
  }
  function updateCharts() {
    setChartExercises([]);
    getCharts().then((data) => {
      setChartExercises(data);
    });
  }
  return (
    <DatabaseContext.Provider
      value={{
        plans,
        getPlan,
        addPlan,
        deletePlan,
        exercises,
        addExercise,
        excerciseToAdd,
        setExcerciseToAdd,
        getPlanExcercise,
        deletePlanExcercise,
        changePlanName,
        getExercise,
        getSortedExercises,
        addExerciseToPlan,
        getAllWorkouts,
        workouts,
        setWorkouts,
        updateExercises,
        setUpdateExercises,
        deleteWorkout,
        updateWorkouts,
        reloadExercises,
        updateCharts,
        chartExercises
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
