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

export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER);`,
      [],
      () => {
        console.log("Table created successfully");
        resolve();
      },
      (error) => {
        console.log("Error creating table " + error.message);
        reject(error);
      }
    );
  });
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

export const getUserInfo = async () => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const user = await db.getFirstAsync("SELECT * FROM user");
  return user;
};

export const getTable = async (table) => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  const data = await db.getAllAsync(`SELECT * FROM ${table}`);
  console.log(data);
  return data;
};
