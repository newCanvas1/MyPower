// database.js
import * as SQLite from "expo-sqlite";
import { exercises } from "../src/utility/exercises";
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
        CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, duration DOUBLE,icon TEXT,description TEXT,notes TEXT,date TEXT);
        `);
  await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS exercises (exerciseId INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,icon TEXT,description TEXT,notes TEXT, workoutId INTEGER,muscle TEXT,category TEXT);
        `);

  await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS sets (id INTEGER PRIMARY KEY AUTOINCREMENT,  exerciseId INTEGER, reps INTEGER,weight DOUBLE,type TEXT);
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
  console.log("Database created");

  prepareExercises();
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
// insert workout
export const insertWorkout = async (
  name,
  duration,
  icon,
  description,
  notes,
  date
) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const result = await db.runAsync(
    "INSERT INTO workouts (name, duration,icon,description,notes,date) VALUES (?, ?,?,?,?,?)",
    `${name}`,
    `${duration}`,
    `${icon}`,
    `${description}`,
    `${notes}`,
    `${date}`
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
export const insertSets = async (exerciseId, reps, weight, type) => {
  const db = await SQLite.openDatabaseAsync("databaseName");

  const result = await db.runAsync(
    "INSERT INTO sets (exerciseId, reps,weight,type) VALUES (?, ?,?,?)",
    `${exerciseId}`,
    `${reps}`,
    `${weight}`,
    `${type}`
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
  console.log(data);

  return data[0];
};

export const getPlanInfo = async (id) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const data = await db.getAllAsync(`SELECT * FROM plans WHERE id = ${id}`);
  console.log(data);

  return data[0];
};
