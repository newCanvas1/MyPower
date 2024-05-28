// App.js
import React from "react";
import { DatabaseProvider } from "./context/DataContext";
import HomeScreen from "./screens/HomeScreen.js";

const App = () => {
  return (
    <DatabaseProvider>
      <HomeScreen />
    </DatabaseProvider>
  );
};

export default App;
