import React, { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { ThemeContext } from "../../../context/ThemeContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { getBestSetOfExerciseOfWorkout } from "../../../database/database";
import { Text } from "react-native";
import { langChoice } from "../../utility/functions/langChoice";

function Set({ exercise, index, workoutId }) {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const [bestSet, setBestSet] = useState(undefined);

  useEffect(() => {
    async function getBestSet(exerciseId, workoutId) {
      const bestSet = await getBestSetOfExerciseOfWorkout(
        exerciseId,
        workoutId
      );
      setBestSet(bestSet);
    }
    getBestSet(exercise.exerciseId, workoutId);
  }, []);

  return (
    bestSet != undefined && (
      <View key={index} className="flex-row items-center px-10 justify-between">
        <Text
          className={theme.textPrimary}
          style={{ fontFamily: langChoice(language, "en", "ar") }}
        >
          {exercise.name}
        </Text>
        <Text
          className={theme.textPrimary}
          style={{ fontFamily: langChoice(language, "en", "ar") }}
        >
          {bestSet?.weight} kg x {bestSet?.reps}
        </Text>
      </View>
    )
  );
}

export default Set;
