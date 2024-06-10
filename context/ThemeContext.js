import React, { createContext, useState, useContext, useEffect } from "react";
import { darkTheme, lightTheme } from "../src/styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    AsyncStorage.setItem(
      "theme",
      theme === lightTheme ? darkTheme : lightTheme
    );
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };
  useEffect(() => {
    // const storedTheme = AsyncStorage.getItem("theme");
    // if (theme !== null) {
    //   setTheme(storedTheme === lightTheme ? darkTheme : lightTheme);
    // } else {
    //   setTheme(lightTheme);
    // }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
