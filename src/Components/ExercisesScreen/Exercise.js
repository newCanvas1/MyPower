import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LanguageContext } from "../../../context/LanguageContext";
import { langChoice } from "../../utility/functions/langChoice";
import { useRouter } from "expo-router";

function Exercise({ exercise }) {
  const { language } = useContext(LanguageContext);
  const router = useRouter();
  const goToExerciseModal = () => {
    router.push(`/exercise/info/${exercise.exerciseId}`);
  };
  return (
    <TouchableOpacity
      onPress={goToExerciseModal}
      className=" flex-1 bg-green-300 p-5 rounded-lg shadow mt-5"
    >
      <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
        {exercise.name}
      </Text>
    </TouchableOpacity>
  );
}

export default Exercise;
