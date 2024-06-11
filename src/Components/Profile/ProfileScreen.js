import React from "react";
import LangSelector from "../General/LangSelector";
import { View } from "react-native";
import ThemeSelector from "../General/ThemeSelector";
function ProfileScreen(props) {
  return (
    <View className="flex-row items-center justify-center p-4">
      <LangSelector />
      <ThemeSelector />
    </View>
  );
}

export default ProfileScreen;
