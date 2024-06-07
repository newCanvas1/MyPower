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
} from "../database/database";
export const DatabaseContext = createContext(null);

export const DatabaseProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [excerciseToAdd, setExcerciseToAdd] = useState([]);

  useEffect(() => {
    getTable("plans").then((data) => {
      setPlans(data);
    });
    getTable("exercises").then((data) => {
      setExercises(data);
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
      exercise.notes
    );
    // update exercises
    setExercises([
      ...exercises,
      { ...exercise, exerciseId: result.lastInsertRowId },
    ]);
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
  return (
    <DatabaseContext.Provider
      value={{
        plans,
        addPlan,
        deletePlan,
        exercises,
        addExercise,
        excerciseToAdd,
        setExcerciseToAdd,
        getPlanExcercise,
        deletePlanExcercise,
        changePlanName,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
