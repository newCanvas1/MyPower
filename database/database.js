// database.js
import * as SQLite from "expo-sqlite";
import { exercises } from "../src/utility/exercises";
import getBestSet from "../src/utility/functions/getBestSet";
export const initDatabase = async () => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  // drop the excercises table
  // await resetDatabase();
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS user (name TEXT, weight INTEGER, height INTEGER );
   
    `);

  await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS user (name TEXT, weight INTEGER, height INTEGER );
       
        `);
  await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS workouts (workoutId INTEGER PRIMARY KEY AUTOINCREMENT, duration INTEGER TEXT,notes TEXT,date TEXT,planId INTEGER);
        `);
  await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS exercises (exerciseId INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,icon TEXT,description TEXT,notes TEXT, workoutId INTEGER,muscle TEXT,category TEXT);
        `);

  await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS sets (id INTEGER PRIMARY KEY AUTOINCREMENT,  exerciseId INTEGER, reps INTEGER,weight DOUBLE,type TEXT,planId INTEGER,workoutId INTEGER,date TEXT);
        `);
  // create plans table
  await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS plans (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,icon TEXT,description TEXT,color TEXT,lastUsed TEXT);
        `);

  // create PlansExercises table
  await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS PlansExercises (id INTEGER PRIMARY KEY AUTOINCREMENT,planId INTEGER,exerciseId INTEGER);
        `);
  await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS charts (id INTEGER PRIMARY KEY AUTOINCREMENT, exerciseId INTEGER, type TEXT);
        `);

  prepareExercises();
  console.log("Database created");
  console.log("Excercises added");
};
async function resetDatabase() {
  const db = await SQLite.openDatabaseAsync("databaseName");
  await db.execAsync(`
        PRAGMA journal_mode = WAL;
        DROP TABLE IF EXISTS user;
        DROP TABLE IF EXISTS workouts;
        DROP TABLE IF EXISTS exercises;
        DROP TABLE IF EXISTS sets;
        DROP TABLE IF EXISTS plans;
        DROP TABLE IF EXISTS PlansExercises;
         DROP TABLE IF EXISTS charts;
        `);
}
async function prepareExercises() {
  const db = await SQLite.openDatabaseAsync("databaseName");

  // Check if there are already exercises in the database
  const results = await db.getAllAsync(
    "SELECT COUNT(*) as count FROM exercises"
  );
  const count = results[0].count;

  if (count === 0) {
    // Only insert exercises if the table is empty

    for (const exercise of exercises) {
      await db.runAsync(
        `INSERT INTO exercises (name, icon, description, notes ,muscle,category) VALUES (?, ?, ?, ?,?,?)`,
        [
          exercise.name,
          exercise.icon,
          exercise.description,
          exercise.notes,
          exercise.muscle,
          exercise.category,
        ]
      );
    }
  }
}

export const insertUser = async (name, weight, height) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  await db.runAsync("DELETE FROM user");
  const result = await db.runAsync(
    "INSERT INTO user (name, weight,height) VALUES (?, ?,?)",
    `${name}`,
    `${weight}`,
    `${height}`
  );

  return result;
};

// insert exercise
export const insertExercise = async (
  name,
  icon,
  description,
  notes,
  category
) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const result = await db.runAsync(
    "INSERT INTO exercises (name, icon,description,notes, category) VALUES (?,?,?,?,?)",
    `${name}`,
    `${icon}`,
    `${description}`,
    `${notes}`,
    `${category}`
  );
  return result;
};
export const insertPlanExcercise = async (planId, exerciseId) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const result = await db.runAsync(
    "INSERT INTO PlansExercises (planId, exerciseId) VALUES (?,?)",
    `${planId}`,
    `${exerciseId}`
  );
  return result;
};
// insert reps
export const insertSets = async (
  exerciseId,
  reps,
  weight,
  type,
  planId,
  workoutId
) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const result = await db.runAsync(
    "INSERT INTO sets (exerciseId,reps,weight,type,planId,workoutId,date) VALUES (?,?,?,?,?,?,?)",
    `${exerciseId}`,
    `${reps}`,
    `${weight}`,
    `${type}`,
    `${planId}`,
    `${workoutId}`,
    `${new Date()}`
  );

  return result;
};

// insert plan
export const insertPlan = async (name, icon, description, color) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const result = await db.runAsync(
    "INSERT INTO plans (name, icon,description,color) VALUES (?, ?,?,?)",
    `${name}`,
    `${icon}`,
    `${description}`,
    `${color}`
  );

  return result;
};
// delete plan
export const deletePlanFromDatabase = async (id) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  await db.runAsync("DELETE FROM plans WHERE id = ?", `${id}`);
  return true;
};
export const getUserInfo = async () => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const user = await db.getFirstAsync("SELECT * FROM user");
  return user;
};

export const getTable = async (table) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const data = await db.getAllAsync(`SELECT * FROM ${table}`);

  return data;
};

// get plansExcercise and join with excercises
export const getPlansExercise = async (planId) => {
  const db = await SQLite.openDatabaseAsync("databaseName");

  const data = await db.getAllAsync(
    `SELECT * FROM PlansExercises LEFT JOIN exercises ON PlansExercises.exerciseId = exercises.exerciseId WHERE PlansExercises.planId = ${planId}`
  );

  return data;
};

// delete plansExcercises row
export const deletePlanExcerciseFromDatabase = async (id) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  await db.runAsync(`DELETE FROM PlansExercises WHERE id = ${id}`);
  return true;
};

// delete exercise
export const deleteExercise = async (id) => {
  const db = await SQLite.openDatabaseAsync("databaseName");

  await db.runAsync("DELETE FROM exercises WHERE id = ?", `${id}`);
  return true;
};

// check if there is a user in the database
export const checkIfUserExists = async () => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const data = await db.getAllAsync("SELECT * FROM user");

  return data.length > 0;
};

export const updatePlanName = async (id, name) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  await db.runAsync(
    "UPDATE plans SET name = ? WHERE id = ?",
    `${name}`,
    `${id}`
  );
  return true;
};

export const getExerciseById = async (id) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const data = await db.getAllAsync(
    `SELECT * FROM exercises WHERE exerciseId = ${id}`
  );

  return data[0];
};

export const getPlanInfo = async (id) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const data = await db.getAllAsync(`SELECT * FROM plans WHERE id = ${id}`);

  return data[0];
};

export const updatePlanLastUsed = async (plan, date) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  await db.runAsync(
    "UPDATE plans SET lastUsed = ? WHERE id = ?",
    `${date}`,
    `${plan}`
  );
  return true;
};

export const insertWorkout = async (duration, notes, date, planId) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const result = await db.runAsync(
    "INSERT INTO workouts (duration, notes, date, planId) VALUES (?,?,?,?)",
    `${duration}`,
    `${notes}`,
    `${date}`,
    `${planId}`
  );
  // 2024-06-15T20:24:01.863Z
  // update plan last used
  await updatePlanLastUsed(planId, date);

  return result.lastInsertRowId;
};

export const getWorkoutInfo = async (id) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const data = await db.getAllAsync(
    `SELECT * FROM workouts JOIN plans ON workouts.planId = plans.id WHERE workouts.workoutId = ${id}`
  );
  const sets = await db.getAllAsync(
    `SELECT * FROM sets WHERE workoutId = ${id}`
  );
  const exercises = await db.getAllAsync(
    `SELECT * FROM exercises WHERE exerciseId IN (SELECT exerciseId FROM sets)`
  );
  const workout = { workout: data[0], sets, exercises };

  return workout;
};

export const getWorkouts = async () => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const data = await db.getAllAsync(
    `SELECT * FROM workouts ORDER BY date DESC`
  );
  const workouts = [];

  for (const workout of data) {
    const sets = await db.getAllAsync(
      `SELECT * FROM sets WHERE workoutId = ${workout.workoutId}`
    );

    // categorize sets by exerciseId
    const categorizedSets = {};
    for (const set of sets) {
      if (categorizedSets[set.exerciseId]) {
        categorizedSets[set.exerciseId].push(set);
      } else {
        categorizedSets[set.exerciseId] = [set];
      }
    }
    const plan = await db.getAllAsync(
      `SELECT * FROM plans WHERE id = ${workout.planId}`
    );
    const exercises = await db.getAllAsync(
      `SELECT * FROM exercises WHERE exerciseId IN (SELECT exerciseId FROM sets)`
    );
    workouts.push({ workout, sets: categorizedSets, exercises, plan: plan[0] });
  }

  // order workouts by date descending
  workouts.sort((a, b) => new Date(b.workout.date) - new Date(a.workout.date));

  return workouts;
};

export const getMostRecentWorkout = async (planId) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const data = await db.getAllAsync(
    `SELECT * FROM workouts JOIN plans ON workouts.planId = plans.id WHERE plans.id = ${planId}`
  );
  const lastWorkout = data[data.length - 1];
  const sets = await db.getAllAsync(
    `SELECT * FROM sets WHERE workoutId = ${lastWorkout.workoutId}`
  );
  const exercises = await db.getAllAsync(
    `SELECT * FROM exercises WHERE exerciseId IN (SELECT exerciseId FROM sets)`
  );
  const workout = { workout: lastWorkout, sets, exercises };

  return workout;
};

export const getBestSetOfExercise = async (exerciseId) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const data = await db.getAllAsync(
    `SELECT * FROM sets WHERE exerciseId = ${exerciseId}`
  );
  // get user weight
  let bestSet = data[0];
  let bestOneRepMax = getBestSet(data[0]);
  // calculate one rep max weight
  for (const set of data) {
    const oneRepMax = getBestSet(set);
    if (oneRepMax > bestOneRepMax) {
      bestSet = set;
    }
  }

  return bestSet;
};

export const getBestSetOfExerciseOfWorkout = async (exerciseId, workoutId) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const data = await db.getAllAsync(
    `SELECT * FROM sets WHERE exerciseId = ${exerciseId} AND workoutId = ${workoutId}`
  );
  // get user weight
  let bestSet = data[0];
  let bestOneRepMax = getBestSet(data[0]);
  // calculate one rep max weight
  for (const set of data) {
    const oneRepMax = getBestSet(set);
    if (oneRepMax > bestOneRepMax) {
      bestSet = set;
    }
  }

  return bestSet;
};

// get last added set of exercise
export const getLastSetOfExercise = async (exerciseId) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const data = await db.getAllAsync(
    `SELECT * FROM sets WHERE exerciseId = ${exerciseId} ORDER BY id DESC LIMIT 1`
  );
  return data[0];
};

// get the sets of a certain exercise in the most recent workout added
export const getSetsOfExercise = async (exerciseId) => {
  const db = await SQLite.openDatabaseAsync("databaseName");

  const data = await db.getAllAsync(
    `SELECT * FROM sets WHERE exerciseId = ${exerciseId} ORDER BY workoutId DESC `
  );
  if (data.length === 0) {
    return [];
  }
  //  take only sets of the latest workoutId

  const latestWorkoutId = data[0].workoutId;
  const latestWorkoutSets = data.filter(
    (set) => set.workoutId === latestWorkoutId
  );

  return latestWorkoutSets;
};

// delete workout and sets
export const deleteWorkoutFromDatabase = async (id) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  await db.runAsync("DELETE FROM workouts WHERE workoutId = ?", `${id}`);
  await db.runAsync("DELETE FROM sets WHERE workoutId = ?", `${id}`);
  return true;
};

// get number of number oftimes a user has done a certain exercise, sets of same workout are counted as one
export const getNumberOfTimesUserHasDoneExercise = async (exerciseId) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const data = await db.getAllAsync(
    `SELECT * FROM sets  WHERE exerciseId = ${exerciseId}`
  );
  let count = 0;
  let workoutIdList = [];
  for (const set of data) {
    if (workoutIdList.includes(set.workoutId)) {
    } else {
      count++;
      workoutIdList.push(set.workoutId);
    }
  }
  // get best set of exercise
  const bestSet = await getBestSetOfExercise(exerciseId);
  // get number of times user has done exercise
  if (count == 0) {
    return false;
  }
  return { bestSet, count };
};

export const getExerciseChartInfo = async (exerciseId) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  let data = await db.getAllAsync(
    `SELECT weight,id,workoutId FROM sets  WHERE exerciseId = ${exerciseId}`
  );

  // get the workout date
  const workout = await db.getAllAsync(`SELECT date,workoutId FROM workouts `);
  for (let set of data) {
    for (let i = 0; i < workout.length; i++) {
      if (workout[i].workoutId == set.workoutId) {
        set.date = workout[i].date;
      }
    }
  }

  const result = [];
  for (let set of data) {
    const date = set.date;
    const weight = set.weight;
    result.push({ x: date, y: weight });
  }
  return result;
};

export const updateWorkoutDate = async (workoutId, date) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  await db.runAsync(
    "UPDATE workouts SET date = ? WHERE workoutId = ?",
    `${date}`,
    `${workoutId}`
  );
  // update the sets of the workout
  await db.runAsync(
    "UPDATE sets SET date = ? WHERE workoutId = ?",
    `${date}`,
    `${workoutId}`
  );
  return true;
};

export async function getWorkoutDates() {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const data = await db.getAllAsync(`SELECT date FROM workouts`);
  const result = {};
  for (let i = 0; i < data.length; i++) {
    // date format should be from Sat Jun 15 2024 00:41:43 GMT+0300 to 2024-06-01

    const date = new Date(data[i].date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
    result[dateString] = {
      selected: true,
      marked: true,
      selectedColor: "blue",
    };
  }
  return result;
}

export async function getWorkoutsOfDay(day) {
  const db = await SQLite.openDatabaseAsync("databaseName");
  // get workouts between the beginning of the day and the end of the day

  const data = await db.getAllAsync(
    `SELECT * FROM workouts JOIN plans ON workouts.planId = plans.id  `
  );
  const modifiesWorkouts = data.filter((workout) => {
    let startOfDay = new Date(day);
    startOfDay.setHours(0, 0, 0, 0);
    let endOfDay = new Date(day);
    endOfDay.setHours(23, 59, 59, 999);

    const isBetween =
      new Date(workout.date) > startOfDay && new Date(workout.date) < endOfDay;

    return isBetween;
  });

  const workouts = [];
  for (const workout of modifiesWorkouts) {
    const sets = await db.getAllAsync(
      `SELECT * FROM sets WHERE workoutId = ${workout.workoutId}`
    );

    // categorize sets by exerciseId
    const categorizedSets = {};
    for (const set of sets) {
      if (categorizedSets[set.exerciseId]) {
        categorizedSets[set.exerciseId].push(set);
      } else {
        categorizedSets[set.exerciseId] = [set];
      }
    }
    const plan = await db.getAllAsync(
      `SELECT * FROM plans WHERE id = ${workout.planId}`
    );
    const exercises = await db.getAllAsync(
      `SELECT * FROM exercises WHERE exerciseId IN (SELECT exerciseId FROM sets)`
    );
    workouts.push({ workout, sets: categorizedSets, exercises, plan: plan[0] });
  }

  // order workouts by date descending
  workouts.sort((a, b) => b.workout.date - a.workout.date);

  return workouts;
}

export const getCharts = async () => {
  const db = await SQLite.openDatabaseAsync("databaseName");

  const data = await db.getAllAsync(`SELECT * FROM charts `);

  return data;
};

export const insertChart = async (exerciseId, type) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const result = await db.runAsync(
    "INSERT INTO charts (exerciseId,type) VALUES (?,?)",
    `${exerciseId}`,
    `${type || "thisMonth"}`
  );
  return result;
};

export const deleteChart = async (id, type) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  await db.runAsync(
    `DELETE FROM charts WHERE exerciseId = ${id} AND type = "${type}"`
  );
  return true;
};

// exercise has a row in the charts table
export const isExerciseInCharts = async (exerciseId, type) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const data = await db.getAllAsync(
    `SELECT * FROM charts WHERE exerciseId = ${exerciseId} ${
      type ? `AND type = "${type}"` : ""
    }`
  );

  return data.length > 0;
};

export const getExerciseChartOfPeriod = async (exerciseId, type) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  // type could be thisMonth, thisYear or yearly
  const data = await db.getAllAsync(
    `SELECT * FROM sets WHERE exerciseId = ${exerciseId}`
  );
  const result = {};

  if (type === "thisMonth") {
    const thisMonth = new Date().getMonth();
    const thisMonthWorkouts = data.filter((set) => {
      const setMonth = new Date(set.date).getMonth();
      return setMonth === thisMonth;
    });
    for (const set of thisMonthWorkouts) {
      const date = new Date(set.date).toLocaleDateString("en-US", {
        day: "numeric",
      });
      // for sets of the same day, take the one with the highest weight
      if (result[date]) {
        if (set.weight > result[date]) {
          result[date] = set.weight;
        }
      } else {
        result[date] = set.weight;
      }
    }
  }

  if (type === "thisYear") {
    const thisYear = new Date().getFullYear();
    const thisYearWorkouts = data.filter((set) => {
      const setYear = new Date(set.date).getFullYear();
      return setYear === thisYear;
    });
    for (const set of thisYearWorkouts) {
      const date = new Date(set.date).toLocaleDateString("en-US", {
        month: "short",
      });
      // for sets of the same month, take the one with the highest weight
      if (result[date]) {
        if (set.weight > result[date]) {
          result[date] = set.weight;
        }
      } else {
        result[date] = set.weight;
      }
    }
  }

  if (type === "yearly") {
    for (const set of data) {
      const date = new Date(set.date).toLocaleDateString("en-US", {
        year: "numeric",
      });
      // for sets of the same year, take the one with the highest weight
      if (result[date]) {
        if (set.weight > result[date]) {
          result[date] = set.weight;
        }
      } else {
        result[date] = set.weight;
      }
    }
  }

  // Transform result into an array of objects with x and y properties
  const chartData = Object.keys(result).map((date) => ({
    x: date,
    y: result[date],
  }));
  return chartData;
};

export const deleteExercisesAndSets = async (
  exercisesToDelete,
  setsToDelete,
  workoutId
) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  // delete exercises
  console.log(exercisesToDelete, workoutId);
  for (const exerciseId of exercisesToDelete) {
    await db.runAsync(
      `DELETE FROM sets WHERE exerciseId = ${exerciseId} AND workoutId = ${workoutId}`
    );
  }

  // delete sets
  for (const setId of setsToDelete) {
    await db.runAsync(`DELETE FROM sets WHERE id = ${setId} `);
  }
};

export const insertNewEditSets = async (setsToUpdate, workoutId) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  for (const exerciseId of Object.keys(setsToUpdate)) {
    for (const set of setsToUpdate[exerciseId]) {
      if (set.type == "new") {
        await db.runAsync(
          `INSERT INTO sets (exerciseId, reps, weight, type, planId, workoutId, date) VALUES (?,?,?,?,?,?,?)`,
          `${exerciseId}`,
          `${set.reps}`,
          `${set.weight}`,
          `regular`,
          `${set.planId}`,
          `${workoutId}`,
          `${new Date()}`
        );
      }
    }
  }
};

export const updateEditedSets = async (setsToUpdate) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  for (const exerciseId of Object.keys(setsToUpdate)) {
    for (const set of setsToUpdate[exerciseId]) {
      if (set.type != "new") {
        await db.runAsync(
          `UPDATE sets SET reps = ?, weight = ? WHERE id = ?`,
          `${set.reps}`,
          `${set.weight}`,
          `${set.id}`
        );
      }
    }
  }
};