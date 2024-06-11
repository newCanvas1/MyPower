import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import formateTime from "../../utility/functions/formatTime";
import { LanguageContext } from "../../../context/LanguageContext";
import { ThemeContext } from "../../../context/ThemeContext";

import { ENGLISH, ARABIC } from "../../utility/labels";
import { langChoice } from "../../utility/functions/langChoice";

import { getBestSetOfExerciseOfWorkout } from "../../../database/database";
import formatDate from "../../utility/functions/formatDate";
function Workout({ item }) {
  const [workout, setWorkout] = useState(item.workout);
  const [exercises, setExercises] = useState(item.exercises);
  const [plan, setPlan] = useState(item.plan);
  const { theme } = useContext(ThemeContext);
  async function getBestSet(exerciseId, workoutId) {
    const bestSet = await getBestSetOfExerciseOfWorkout(exerciseId, workoutId);
    return bestSet;
  }

  const { language } = useContext(LanguageContext);

  return (
    <View className={"shadow w-full p-2 pb-4 rounded-xl " + theme.primary}>
      <View className="flex-row items-center justify-between p-4">
        <View>
          <Text
            className={"text-xl " + theme.textSecondary}
            style={{ fontFamily: langChoice(language, "en", "ar") }}
          >
            {plan.name}
          </Text>
          <Text
            className={theme.textSecondary}
            style={{ fontFamily: langChoice(language, "en", "ar") }}
          >
            {formateTime(workout.duration)}
          </Text>
        </View>

        <Text
          className={theme.textSecondary}
          style={{ fontFamily: langChoice(language, "en", "ar") }}
        >
          {formatDate(workout.date)}
        </Text>
      </View>
      <View className="flex-row items-center px-10 justify-between mb-2">
        <Text
          className={theme.textSecondary}
          style={{ fontFamily: langChoice(language, "en", "ar") }}
        >
          {langChoice(language, ENGLISH.EXCERCISES, ARABIC.EXCERCISES)}
        </Text>
        <Text
          className={theme.textSecondary}
          style={{ fontFamily: langChoice(language, "en", "ar") }}
        >
          {langChoice(language, ENGLISH.BEST_SET, ARABIC.BEST_SET)}
        </Text>
      </View>

      {exercises.map(async (exercise, index) => {
        const bestSet = await getBestSet(
          exercise.exerciseId,
          workout.workoutId
        );
        return (
          <View
            key={index}
            className="flex-row items-center px-10 justify-between"
          >
            <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
              {exercise.name}
            </Text>
            <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
              {bestSet?.weight} kg x {bestSet?.reps}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export default Workout;
