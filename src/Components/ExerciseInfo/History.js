import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import {
  deleteExerciseFromWorkout,
  getExerciseRecord,
  getWorkouts,
} from "../../../database/database";
import WorkoutItem from "./WorkoutItem";
import { LanguageContext } from "../../../context/LanguageContext";
import { ThemeContext } from "../../../context/ThemeContext";
import { langChoice } from "../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../utility/labels";
import { DatabaseContext } from "../../../context/DataContext";
import { FlatList } from "react-native";

function History({ exercise }) {
  const [workouts, setWorkouts] = useState([]);
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const [noData, setNoData] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(7);
  const { updateWorkouts } = useContext(DatabaseContext);
  async function deleteRecord(exerciseId, workoutId) {
    await deleteExerciseFromWorkout(exerciseId, workoutId);
    updateWorkouts();
    setWorkouts((prev) =>
      prev.filter((workout) => workout.workout.workoutId != workoutId)
    );
  }

  async function getHistory() {
    const workouts = await getExerciseRecord(page, limit, exercise.exerciseId);

    const workoutsList = [];
    for (const workout of workouts) {
      if (workout.sets[exercise.exerciseId]) {
        workoutsList.push(workout);
      }
    }
    if (workoutsList.length == 0 && page == 1) {
      setNoData(true);
    } else {
      setNoData(false);
    }
    setWorkouts((prev) => [...prev, ...workoutsList]);
  }
  useEffect(() => {
    getHistory();
  }, []);

  return (
    <View>
      {!noData ? (
        <FlatList
          className="p-2 mb-10 h-[600]"
          onEndReached={() => {
            console.log("reached");
            if (page == 1) {
              setWorkouts([]);
            }
            setPage((prev) => prev + 1);
            getHistory();
          }}
          keyExtractor={(item) => item.workout.workoutId}
          data={workouts}
          renderItem={({ item }) => (
            <WorkoutItem
              workout={item}
              exercise={exercise}
              deleteRecord={deleteRecord}
            />
          )}
        />
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
