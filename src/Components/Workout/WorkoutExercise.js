import React, { useContext, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import SetList from "./SetList";
import { WorkoutContext } from "../../../context/WorkoutContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { ARABIC, ENGLISH } from "../../utility/labels";
import { langChoice } from "../../utility/functions/langChoice";
import { ThemeContext } from "../../../context/ThemeContext";

function WorkoutExercise({ exercise }) {
  const { setSets, sets } = useContext(WorkoutContext);
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  return (
    <View className="flex flex-col">
      <View className={"  p-2 shadow w-[100%] "}>
        <Text className={theme.textPrimary}>{exercise.name}</Text>
      </View>
      {!sets[exercise.exerciseId]?.length == 0 && (
        <View
          className={
            " p-2 shadow w-[80%] flex-row justify-between items-center self-end " +
            theme.textPrimary
          }
        >
          <Text
            className={theme.textPrimary}
            style={{ fontFamily: langChoice(language, "en", "ar") }}
          >
            {langChoice(language, ENGLISH.PREVIOUS, ARABIC.PREVIOUS)}
          </Text>
          <Text
            className={theme.textPrimary}
            style={{ fontFamily: langChoice(language, "en", "ar") }}
          >
            {langChoice(language, ENGLISH.WEIGHT, ARABIC.WEIGHT)}
          </Text>
          <Text
            className={theme.textPrimary}
            style={{ fontFamily: langChoice(language, "en", "ar") }}
          >
            {langChoice(language, ENGLISH.REPS, ARABIC.REPS)}
          </Text>
        </View>
      )}
      <SetList exerciseId={exercise.exerciseId} />

      <TouchableOpacity
        onPress={() => {
          const initialSet = {
            id: Math.random() * 1000,
            reps: 0,
            weight: 0,
            type: "regular",
            exerciseId: exercise.exerciseId,
            planId: exercise.planId,
          };
          setSets((sets) => {
            const newSets = { ...sets };
            newSets[exercise.exerciseId].push(initialSet);
            return newSets;
          });
        }}
        className={
          "border w-full items-center p-1 rounded mt-4 self-end " +
          `border-${theme.color}`
        }
      >
        <Text
          style={{ fontFamily: langChoice(language, "en", "ar") }}
          className={"text-md " + theme.textPrimary}
        >
          + {langChoice(language, ENGLISH.ADD_SET, ARABIC.ADD_SET)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default WorkoutExercise;
