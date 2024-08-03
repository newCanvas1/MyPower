import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import {
  deleteExerciseFromWorkout,
  getWorkouts,
} from "../../../database/database";
import WorkoutItem from "./WorkoutItem";
import { LanguageContext } from "../../../context/LanguageContext";
import { ThemeContext } from "../../../context/ThemeContext";
import { langChoice } from "../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../utility/labels";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

function History({ exercise }) {
  const [workouts, setWorkouts] = useState([]);
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const [noData, setNoData] = useState(false);
  async function deleteRecord(exerciseId, workoutId) {
    await deleteExerciseFromWorkout(exerciseId, workoutId);
    getHistory();
  }
  async function getHistory() {
    const workouts = await getWorkouts();

    const workoutsList = [];
    for (const workout of workouts) {
      if (workout.sets[exercise.exerciseId]) {
        workoutsList.push(workout);
      }
    }
    if (workoutsList.length == 0) {
      setNoData(true);
    } else {
      setNoData(false);
    }
    setWorkouts(workoutsList);
  }
  useEffect(() => {
    getHistory();
  }, []);

  return (
    <View>
      {!noData ? (
        <ScrollView className="p-2">
          {workouts.map((workout) => {
            return (
              <WorkoutItem
                key={workout.workout.workoutId}
                workout={workout}
                exercise={exercise}
                deleteRecord={deleteRecord}
              />
            );
          })}
        </ScrollView>
      ) : (
        <Text
          className={`text-${theme.color} text-center`}
          style={{ fontSize: 20, fontFamily: langChoice(language, "en", "ar") }}
        >
          {langChoice(
            language,
            ENGLISH.NO_REGISTERED_SETS,
            ARABIC.NO_REGISTERED_SETS
          )}
        </Text>
      )}
    </View>
  );
}

export default History;
