// App.js
import React from "react";
import { DatabaseProvider } from "./context/DataContext";
import HomeScreen from "./src/screens/HomeScreen.js";
import EnterUserInput from "./src/screens/EnterUserInput.js";
import { View } from "react-native";

const App = () => {
  return (
    <View className="w-[100%]">
      <DatabaseProvider>
        <EnterUserInput />
      </DatabaseProvider>
    </View>
  );
};

export default App;
