import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getTable,
  insertPlan,
  deletePlan,
  deletePlanFromDatabase,
} from "../database/database";
export const DatabaseContext = createContext(null);

export const DatabaseProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    getTable("plans").then((data) => {
      setPlans(data);
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

  return (
    <DatabaseContext.Provider value={{ plans, addPlan, deletePlan }}>
      {children}
    </DatabaseContext.Provider>
  );
};
