// database.js
import * as SQLite from "expo-sqlite";

let db;

export const initDatabase = async () => {
  const db = await SQLite.openDatabaseAsync("databaseName");

  // `execAsync()` is useful for bulk queries when you want to execute altogether.
  // Please note that `execAsync()` does not escape parameters and may lead to SQL injection.
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
    INSERT INTO test (value, intValue) VALUES ('test1', 123);
    INSERT INTO test (value, intValue) VALUES ('test2', 456);
    INSERT INTO test (value, intValue) VALUES ('test3', 789);
    `);

  // `runAsync()` is useful when you want to execute some write operations.
  const result = await db.runAsync(
    "INSERT INTO test (value, intValue) VALUES (?, ?)",
    "aaa",
    100
  );
  // `getFirstAsync()` is useful when you want to get a single row from the database.
  const firstRow = await db.getFirstAsync("SELECT * FROM test");
  console.log(firstRow.id, firstRow.value, firstRow.intValue);

  // `getAllAsync()` is useful when you want to get all results as an array of objects.
  const allRows = await db.getAllAsync("SELECT * FROM test");
  for (const row of allRows) {
    console.log(row.id, row.value, row.intValue);
  }

  // `getEachAsync()` is useful when you want to iterate SQLite query cursor.
  for await (const row of db.getEachAsync("SELECT * FROM test")) {
    console.log(row.id, row.value, row.intValue);
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

export const insertUser = (name, age) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Users (name, age) VALUES (?,?)",
        [name, age],
        (tx, results) => {
          console.log("User inserted successfully");
          resolve(results);
        },
        (error) => {
          console.log("Error inserting user " + error.message);
          reject(error);
        }
      );
    });
  });
};

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Users",
        [],
        (tx, results) => {
          let users = [];
          for (let i = 0; i < results.rows.length; i++) {
            users.push(results.rows.item(i));
          }
          resolve(users);
        },
        (error) => {
          console.log("Error getting users " + error.message);
          reject(error);
        }
      );
    });
  });
};
