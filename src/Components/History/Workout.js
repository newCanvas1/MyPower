import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import formateTime from "../../utility/functions/formatTime";
import { LanguageContext } from "../../../context/LanguageContext";
import { ENGLISH, ARABIC } from "../../utility/labels";
import { langChoice } from "../../utility/functions/langChoice";

import { getBestSetOfExerciseOfWorkout } from "../../../database/database";
import formatDate from "../../utility/functions/formatDate";
function Workout({ item }) {
  const [workout, setWorkout] = useState(item.workout);
  const [exercises, setExercises] = useState(item.exercises);
  const [plan, setPlan] = useState(item.plan);

  async function getBestSet(exerciseId, workoutId) {
    const bestSet = await getBestSetOfExerciseOfWorkout(exerciseId, workoutId);
    return bestSet;
  }

  const { language } = useContext(LanguageContext);

  return (
    <View className="bg-green-400 shadow w-full p-2 pb-4 rounded-xl">
      <View className="flex-row items-center justify-between p-4">
        <View>
          <Text
            className="text-xl "
            style={{ fontFamily: langChoice(language, "en", "ar") }}
          >
            {plan.name}
          </Text>
          <Text  style={{ fontFamily: langChoice(language, "en", "ar") }}>
            {formateTime(workout.duration)}
          </Text>
        </View>

        <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
          {formatDate(workout.date)}
        </Text>
      </View>
      <View className="flex-row items-center px-10 justify-between mb-2">
        <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
          {langChoice(language, ENGLISH.EXCERCISES, ARABIC.EXCERCISES)}
        </Text>
        <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
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
