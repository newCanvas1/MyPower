import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getTable,
  insertPlan,
  deletePlan,
  deletePlanFromDatabase,
  insertExercise,
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
    const result = await insertPlan(plan.name, plan.icon, plan.description);
    // update plans
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
    setExercises([...exercises, { ...exercise, id: result.lastInsertRowId }]);
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
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
