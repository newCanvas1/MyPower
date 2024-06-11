import React, { useContext } from "react";
import { View } from "react-native";
import CreatePlanForm from "../Components/CreatePlanScreen/CreatePlanForm";
import { ThemeContext } from "../../context/ThemeContext";

function CreatePlanScreen(props) {
  const {theme} = useContext(ThemeContext);
  return (
    <View className={theme.mainScreen}>
      <CreatePlanForm />
    </View>
  );
}

export default CreatePlanScreen;
