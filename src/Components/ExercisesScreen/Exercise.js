import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LanguageContext } from "../../../context/LanguageContext";
import { langChoice } from "../../utility/functions/langChoice";
import { useRouter } from "expo-router";
import { ThemeContext } from "../../../context/ThemeContext";
import { DatabaseContext } from "../../../context/DataContext";
import { getNumberOfTimesUserHasDoneExercise } from "../../../database/database";

function Exercise({ exercise }) {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const {workouts} = useContext(DatabaseContext);
  const router = useRouter();
  const [info, setInfo] = useState({});
  const goToExerciseModal = () => {
    router.push(`/exercise/info/${exercise.exerciseId}`);
  };
  useEffect(() => {
    async function getInfo() {
      const info = await getNumberOfTimesUserHasDoneExercise(
        exercise.exerciseId
      );
      setInfo(info);

    }
    getInfo();
  }, [workouts]);
  return (
    <View>
      {info.count > 0 && (
        <View className={`${theme.countTag} items-center justify-center w-4 h-4 rounded self-end absolute shadow-lg z-10 mt-2` }>
          <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
            {info.count}
          </Text>
        </View>
      )}
      <TouchableOpacity
        onPress={goToExerciseModal}
        className={
          " flex-1 flex-row justify-between  p-5 rounded-lg shadow mt-3 " +
          theme.primary
        }
      >
        <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
          {exercise.name}
        </Text>
        <View className="flex-col justify-between items-center">
          {info.bestSet != undefined && (
            <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
              {info.bestSet?.weight}kg x {info.bestSet?.reps}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Exercise;
