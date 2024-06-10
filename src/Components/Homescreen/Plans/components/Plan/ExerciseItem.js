import React, { useContext, useEffect, useState } from "react";
import { langChoice } from "../../../../../utility/functions/langChoice";
import { LanguageContext } from "../../../../../../context/LanguageContext";
import { Text, View } from "react-native";
import { getBestSetOfExercise } from "../../../../../../database/database";

function ExerciseItem({ exercise }) {
  const { language } = useContext(LanguageContext);
  const [bestSet, setBestSet] = useState({});
  useEffect(() => {
    async function getSet() {
      const set = await getBestSetOfExercise(exercise.exerciseId);
      setBestSet(set);
    }
    getSet();
  }, []);
  return (
    <View className="flex-row items-center justify-between rounded  bg-green-300 p-4 shadow ">
      <Text
        style={{ fontFamily: langChoice(language, "en", "ar") }}
        className=" font-bold w-[70%] h-full "
      >
        {exercise.name}
      </Text>

      <View className="flex-row-reverse">
        <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
          kg x {bestSet?.reps}
        </Text>
        <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
          {bestSet?.weight}
        </Text>
      </View>
    </View>
  );
}

export default ExerciseItem;
