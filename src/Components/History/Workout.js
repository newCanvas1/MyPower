import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import formateTime from "../../utility/functions/formatTime";
import { LanguageContext } from "../../../context/LanguageContext";
import { ENGLISH, ARABIC } from "../../utility/labels";
import { langChoice } from "../../utility/functions/langChoice";
import getBestSet from "../../utility/functions/getBestSet";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getBestSetOfExercise, getBestSetOfExerciseOfWorkout } from "../../../database/database";
function Workout({ item }) {
  const [sets, setSets] = useState(item.sets);
  const [workout, setWorkout] = useState(item.workout);
  const [exercises, setExercises] = useState(item.exercises);
  const [plan, setPlan] = useState(item.plan);

  async function getBestSet(exerciseId, workoutId) {
    const bestSet = await getBestSetOfExerciseOfWorkout(exerciseId, workoutId);
    return bestSet;
  }
  console.log("sets", item);

  const { language } = useContext(LanguageContext);

  return (
    <View className="bg-green-400 shadow w-full h-40 rounded-xl">
      <View className="flex-row items-center justify-between p-4">
        <Text
          className="text-xl "
          style={{ fontFamily: langChoice(language, "en", "ar") }}
        >
          {plan.name}
        </Text>
        <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
          {formateTime(workout.duration)}
        </Text>
      </View>
      {exercises.map(async (exercise, index) => {
        const bestSet = await getBestSet(exercise.exerciseId, workout.workoutId);
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
