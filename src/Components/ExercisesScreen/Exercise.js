import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LanguageContext } from "../../../context/LanguageContext";
import { langChoice } from "../../utility/functions/langChoice";
import { useRouter } from "expo-router";
import { ThemeContext } from "../../../context/ThemeContext";
import { DatabaseContext } from "../../../context/DataContext";
import { Feather } from "@expo/vector-icons";
import {
  getExerciseChartOfPeriod,
  getNumberOfTimesUserHasDoneExercise,
  isExerciseInCharts,
} from "../../../database/database";

function Exercise({ exercise }) {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { workouts } = useContext(DatabaseContext);
  const router = useRouter();
  const [info, setInfo] = useState({});
  const [addedToHomescreen, setAddedToHomescreen] = useState(false);
  const goToExerciseModal = () => {
    router.push(`/exercise/info/${exercise.exerciseId}`);
  };
  useEffect(() => {
    async function getInfo() {
      isExerciseInCharts(exercise.exerciseId).then((isInCharts) => {
        setAddedToHomescreen(isInCharts);
      });
      const info = await getNumberOfTimesUserHasDoneExercise(
        exercise.exerciseId
      );

      setInfo(info);
    }
    getInfo();
  }, [workouts]);
  return (
    <View className=" h-20">
      <View
        className={` flex-row items-center justify-center  self-end absolute z-10 mt-2`}
      >
        {addedToHomescreen && (
          <View
            className={`${theme.countTag} rounded w-4 h-4 mx-1 items-center justify-center  shadow-lg `}
          >
            <Feather size={12} name="home" color={"white"} />
          </View>
        )}
        {info.count > 0 && (
          <View
            className={`${theme.countTag} rounded w-4 h-4  items-center justify-center  shadow-lg `}
          >
            <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
              {info.count}
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        onPress={goToExerciseModal}
        className={
          " flex-1 flex-row justify-between  p-5 rounded-lg shadow mt-3 " +
          theme.primary
        }
      >
        <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
          {exercise?.name}
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
