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
import AsyncStorage from "@react-native-async-storage/async-storage";
export const DatabaseContext = createContext(null);

export const DatabaseProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [excerciseToAdd, setExcerciseToAdd] = useState([]);
  const [updateExercises, setUpdateExercises] = useState(false);
  const [chartExercises, setChartExercises] = useState([]);
  const [refreshHistory, setRefreshHistory] = useState(true);
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
    // get showDifficultyList and showRestTimeList from async storage
    let showDifficultyList = await AsyncStorage.getItem("showDifficultyList");
    showDifficultyList = JSON.parse(showDifficultyList);
    let showRestTimeList = await AsyncStorage.getItem("showRestTimeList");
    showRestTimeList = JSON.parse(showRestTimeList);
    // add the plan to showDifficultyList
    if (showDifficultyList != null) {
      showDifficultyList.push({
        planId: result.lastInsertRowId,
        showDifficulty: true,
      });
      await AsyncStorage.setItem(
        "showDifficultyList",
        JSON.stringify(showDifficultyList)
      );
    }
    else {
      showDifficultyList = [
        {
          planId: result.lastInsertRowId,
          showDifficulty: true,
        },
      ];
      await AsyncStorage.setItem(
        "showDifficultyList",
        JSON.stringify(showDifficultyList)
      );
    }
    // add the plan to showRestTimeList
    if (showRestTimeList != null) {
      showRestTimeList.push({
        planId: result.lastInsertRowId,
        showRestTime: true,
      });
      await AsyncStorage.setItem(
        "showRestTimeList",
        JSON.stringify(showRestTimeList)
      );
    }
    else {
      showRestTimeList = [
        {
          planId: result.lastInsertRowId,
          showRestTime: true,
        },
      ];
      await AsyncStorage.setItem(
        "showRestTimeList",
        JSON.stringify(showRestTimeList)
      );
    }

    setExcerciseToAdd([]);
    setPlans([...plans, { ...plan, id: result.lastInsertRowId }]);
  };

  const getHistory = async (page, limit) => {
    const data = await getWorkouts(page, limit);
    return data;
  };

  useEffect(() => {}, [workouts]);

  // delete plan from database
  const deletePlan = async (id) => {
    const deleted = await deletePlanFromDatabase(id);
    if (deleted) {
      setPlans(plans.filter((plan) => plan.id !== id));
      // delete from showDifficultyList
      let showDifficultyList = await AsyncStorage.getItem("showDifficultyList");
      showDifficultyList = JSON.parse(showDifficultyList);
      showDifficultyList = showDifficultyList.filter(
        (plan) => plan.planId !== id
      );
      await AsyncStorage.setItem(
        "showDifficultyList",
        JSON.stringify(showDifficultyList)
      );
      // delete from showRestTimeList
      let showRestTimeList = await AsyncStorage.getItem("showRestTime");
      showRestTimeList = JSON.parse(showRestTimeList);
      showRestTimeList = showRestTimeList.filter(
        (plan) => plan.planId !== id
      );
      await AsyncStorage.setItem(
        "showRestTime",
        JSON.stringify(showRestTimeList)
      );
    
    }
    updateWorkouts();
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
  const getAllWorkouts = async (page, limit) => {
    const data = await getWorkouts(page, limit);
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
    setWorkouts([]);
    getAllWorkouts().then((data) => {
      setWorkouts(data);
    });
  }
  function updatePlans() {
    setPlans([]);
    getTable("plans").then((data) => {
      setPlans(data);
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
        chartExercises,
        getHistory,
        refreshHistory,
        setRefreshHistory,
        updatePlans,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
