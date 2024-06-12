import React, { useContext, useEffect, useState } from "react";
import { langChoice } from "../../../../../utility/functions/langChoice";
import { LanguageContext } from "../../../../../../context/LanguageContext";
import { Text, View } from "react-native";
import { getBestSetOfExercise } from "../../../../../../database/database";
import { ThemeContext } from "../../../../../../context/ThemeContext";

function ExerciseItem({ exercise }) {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const [bestSet, setBestSet] = useState({});
  useEffect(() => {
    async function getSet() {
      const set = await getBestSetOfExercise(exercise.exerciseId);
      setBestSet(set);
    }
    getSet();
  }, []);
  console.log(bestSet == undefined);
  return (
    <View
      className={
        "flex-row items-center justify-between rounded p-4 shadow " +
        theme.primary
      }
    >
      <Text
        style={{ fontFamily: langChoice(language, "en", "ar") }}
        className=" font-bold w-[70%] h-full "
      >
        {exercise.name}
      </Text>

      {bestSet != undefined ? (
        <View className="flex-row-reverse">
          <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
            kg x {bestSet?.reps}
          </Text>
          <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
            {bestSet?.weight}
          </Text>
        </View>
      ) : (
        <View className="bg-black w-10 h-1 rounded"></View>
      )}
    </View>
  );
}

export default ExerciseItem;
