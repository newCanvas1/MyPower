// DatabaseContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { initDatabase, createTable, insertUser, getUsers } from '../database/database.js';

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [dbInitialized, setDbInitialized] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const initializeDatabase = () => {
      try {
         initDatabase();
        //  createTable();
        // setDbInitialized(true);
        // fetchUsers();
      } catch (error) {
        console.error('Error initializing database', error);
      }
    };

    initializeDatabase();
  }, []);

  const addUser = async (name, age) => {
    try {
      await insertUser(name, age);
      fetchUsers();
    } catch (error) {
      console.error('Error adding user', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const usersList = await getUsers();
      setUsers(usersList);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  return (
    <DatabaseContext.Provider value={{ dbInitialized, users, addUser }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => useContext(DatabaseContext);
