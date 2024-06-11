import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { langChoice } from "../../utility/functions/langChoice";
import formatTime from "../../utility/functions/formatTime";
import { WorkoutContext } from "../../../context/WorkoutContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { ThemeContext } from "../../../context/ThemeContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

function BottomWorkoutIndicator(props) {
  const { activeWorkout, timePassed, planId } = useContext(WorkoutContext);
  const { language } = useContext(LanguageContext);
  const {theme} = useContext(ThemeContext);
  return (
    activeWorkout && (
      <TouchableOpacity
        onPress={() => {
          router.push(`workout/${planId}`);
        }}
        className={" rounded  bg-green-300 p-1 shadow w-[90%] self-center flex-row justify-between items-center h-20 "+theme.primary}
      >
        <Text
          className=" text-xl"
          style={{ fontFamily: langChoice(language, "en", "ar") }}
        >
          Back Day {formatTime(timePassed)}
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={30} color="black" />
      </TouchableOpacity>
    )
  );
}

export default BottomWorkoutIndicator;
