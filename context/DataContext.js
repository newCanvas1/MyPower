import React, { createContext, useContext, useEffect, useState } from "react";
import { getTable, insertPlan } from "../database/database";
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
    console.log(result);
    // update plans
    setPlans([...plans, { ...plan, id: result.lastInsertRowId }]);
  };
  // delete plan from database
  const deletePlan = async (id) => {
    const result = await getTable("plans").then((data) => {
      return data.filter((plan) => plan.id !== id);
    });
    console.log(result);
    // update plans
    setPlans(result);
  };

  return (
    <DatabaseContext.Provider value={{ plans, addPlan }}>
      {children}
    </DatabaseContext.Provider>
  );
};
