import React, { useContext, useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import SetList from "./SetList";
import { LanguageContext } from "../../../../context/LanguageContext";
import { ARABIC, ENGLISH } from "../../../utility/labels";
import { langChoice } from "../../../utility/functions/langChoice";
import { ThemeContext } from "../../../../context/ThemeContext";
import Feather from "react-native-vector-icons/Feather";
import { MaterialCommunityIcons } from "react-native-vector-icons";
function WorkoutExercise({
  setExercisesToDelete,
  exercise,
  setExercises,
  setsToUpdate,
  setSetsToUpdate,
  setSetsToDelete,
}) {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  return (
    <View className="flex flex-col">
      <View className={" flex-row justify-between p-2 shadow w-[100%] "}>
        <Text className={theme.textPrimary}>{exercise.name}</Text>
        <TouchableOpacity
          onPress={() => {
            // delete the exercise
            setExercises((prev) => {
              const newExercises = prev.filter(
                (e) => e.exerciseId !== exercise.exerciseId
              );
              return newExercises;
            });
            setExercisesToDelete((prev) => {
              const newExercises = prev;
              newExercises.push(exercise.exerciseId);
              return newExercises;
            });
          }}
          className="self-end shadow items-center justify-center"
        >
          <MaterialCommunityIcons name={"delete"} size={20} color={"red"} />
        </TouchableOpacity>
      </View>
      {setsToUpdate[exercise.exerciseId]?.length !== 0 && (
        <View
          className={
            " p-2 shadow w-[80%] flex-row justify-between items-center self-end " +
            theme.textPrimary
          }
        >
          <Text
            className={theme.textPrimary + " justify-center items-center "}
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
      <SetList
        exerciseId={exercise.exerciseId}
        setsToUpdate={setsToUpdate}
        setSetsToUpdate={setSetsToUpdate}
        setSetsToDelete={setSetsToDelete}
      />

      <TouchableOpacity
        onPress={() => {
          const initialSet = {
            id: Math.random() * 1000,
            reps: 0,
            weight: 0,
            type: "new",
            exerciseId: exercise.exerciseId,
            planId: exercise.planId,
          };
          setSetsToUpdate((sets) => {
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
