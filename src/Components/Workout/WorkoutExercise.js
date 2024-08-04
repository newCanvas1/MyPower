import React, { useContext, useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import SetList from "./SetList";
import { WorkoutContext } from "../../../context/WorkoutContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { ARABIC, ENGLISH } from "../../utility/labels";
import { langChoice } from "../../utility/functions/langChoice";
import { ThemeContext } from "../../../context/ThemeContext";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import Tooltip from "../General/Tooltip/Tooltip";
function WorkoutExercise({ exercise }) {
  const { setSets, sets, setExercises } = useContext(WorkoutContext);
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const [showTooltip, setShowTooltip] = useState(false);
  const ref = useRef();
  function addInitialSet() {
    const initialSet = {
      id: Math.random() * 1000,
      reps: 0,
      weight: 0,
      type: "regular",
      exerciseId: exercise.exerciseId,
      planId: exercise.planId,
      difficulty: "5",
    };
    setSets((sets) => {
      const newSets = { ...sets };
      newSets[exercise.exerciseId].push(initialSet);
      return newSets;
    });
  }

  // if the workout has no sets, add the initial set to the workout, do add the initial set only once
  if (sets[exercise.exerciseId]?.length == 0) {
    addInitialSet();
  }

  return (
    <View className="flex flex-col">
      <View className={" flex-row justify-between p-2 shadow w-[100%] "}>
        <Text className={theme.textPrimary}>{exercise.name}</Text>
        <TouchableOpacity
          ref={ref}
          onPress={() => setShowTooltip(true)}
          className="self-end p-1 rounded bg-gray-400 shadow items-center justify-center"
        >
          <Icon name="options" size={15} color={theme.color} />
        </TouchableOpacity>
        <Tooltip
          tooltipRef={ref}
          showTooltip={showTooltip}
          setShowTooltip={setShowTooltip}
          buttons={[
            {
              func: () => {
                setExercises((prev) => {
                  const newExercises = prev.filter((e) => e.id !== exercise.id);
                  return newExercises;
                });
                setSets((prev) => {
                  const newSets = { ...prev };
                  newSets[exercise.exerciseId] = [];
                  return newSets;
                });
              },
              label: langChoice(language, ENGLISH.DELETE, ARABIC.DELETE),
              color: "red",
              icon: (
                <MaterialCommunityIcons
                  name={"delete"}
                  size={15}
                  color={"red"}
                />
              ),
            },
          ]}
        />
      </View>
      {!sets[exercise.exerciseId]?.length == 0 && (
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
          <View>
            <Feather name="check" size={20} color={theme.color} />
          </View>
        </View>
      )}
      <SetList exerciseId={exercise.exerciseId} />

      <TouchableOpacity
        onPress={addInitialSet}
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
