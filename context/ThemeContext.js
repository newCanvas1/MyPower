import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { darkTheme, lightTheme } from "../src/styles/theme";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");
  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = async () => {
    if (mode === "light") {
      setMode("dark");
      setTheme(darkTheme);
      await AsyncStorage.setItem("theme", "dark");
    } else {
      setMode("light");
      setTheme(lightTheme);
      await AsyncStorage.setItem("theme", "light");
    }
  };
  useEffect(() => {
    async function getMode() {
      const theme = await AsyncStorage.getItem("theme");
      if (theme !== null) {
        setMode(theme);
        if (theme === "dark") {
          setTheme(darkTheme);
        } else {
          setTheme(lightTheme);
        }
      } else {
        setMode("dark");
        setTheme(darkTheme);
      }
    }
    getMode();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mode }}>
      {children}
    </ThemeContext.Provider>
  );
};
