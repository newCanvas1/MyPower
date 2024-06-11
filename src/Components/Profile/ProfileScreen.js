import React, { useContext } from "react";
import LangSelector from "../General/LangSelector";
import { View } from "react-native";
import ThemeSelector from "../General/ThemeSelector";
import { ThemeContext } from "../../../context/ThemeContext";
function ProfileScreen(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <View className={"flex-row items-center justify-center p-4 h-full "+theme.mainScreen}>
      <LangSelector />
      <ThemeSelector />
    </View>
  );
}

export default ProfileScreen;
