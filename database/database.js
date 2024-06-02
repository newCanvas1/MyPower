// database.js
import * as SQLite from "expo-sqlite";

let db;

export const initDatabase = async () => {
  const db = await SQLite.openDatabaseAsync("databaseName");

  // `execAsync()` is useful for bulk queries when you want to execute altogether.
  // Please note that `execAsync()` does not escape parameters and may lead to SQL injection.
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS user (name TEXT, weight INTEGER, height INTEGER );
   
    `);

  // `execAsync()` is useful for bulk queries when you want to execute altogether.
  // Please note that `execAsync()` does not escape parameters and may lead to SQL injection.
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
        CREATE TABLE IF NOT EXISTS exercises (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,icon TEXT,description TEXT,notes TEXT, workoutId INTEGER);
        `);

  await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS sets (id INTEGER PRIMARY KEY AUTOINCREMENT,  exerciseId INTEGER, reps INTEGER,weight DOUBLE,type TEXT);
        `);
  // create plans table
  await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS plans (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,icon TEXT,description TEXT);
        `);

  // `getFirstAsync()` is useful when you want to get a single row from the database.
  const firstRow = await db.getFirstAsync("SELECT * FROM user");
  // console.log(firstRow.id, firstRow.value, firstRow.intValue);

  // `getAllAsync()` is useful when you want to get all results as an array of objects.
  const allRows = await db.getAllAsync("SELECT * FROM test");
  for (const row of allRows) {
    // console.log(row.id, row.value, row.intValue);
  }

  // `getEachAsync()` is useful when you want to iterate SQLite query cursor.
  for await (const row of db.getEachAsync("SELECT * FROM test")) {
    // console.log(row.id, row.value, row.intValue);
  }
};

export const insertUser = async (name, weight, height) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  await db.runAsync("DELETE FROM user");
  const result = await db.runAsync(
    "INSERT INTO user (name, weight,height) VALUES (?, ?,?)",
    `${name}`,
    `${weight}`,
    `${height}`
  );
  console.log(result);
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
  console.log(result);
  return result;
};
// insert exercise
export const insertExercise = async (name, icon, description, notes) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const result = await db.runAsync(
    "INSERT INTO exercises (name, icon,description,notes) VALUES (?,?,?,?)",
    `${name}`,
    `${icon}`,
    `${description}`,
    `${notes}`
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
  console.log(result);
  return result;
};

// insert plan
export const insertPlan = async (name, icon, description) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const result = await db.runAsync(
    "INSERT INTO plans (name, icon,description) VALUES (?, ?,?)",
    `${name}`,
    `${icon}`,
    `${description}`
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
