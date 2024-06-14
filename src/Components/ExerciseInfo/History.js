import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getWorkouts } from "../../../database/database";
import WorkoutItem from "./WorkoutItem";

function History({ exercise }) {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    async function getHistory() {
      console.log("getHistory", exercise.exerciseId);
      const workouts = await getWorkouts();
      const workoutsList = [];
      for (const workout of workouts) {
        if (workout.sets[exercise.exerciseId]) {
          console.log("workout", workout.sets[exercise.exerciseId]);
          workoutsList.push(workout);
        }
      }
      setWorkouts(workoutsList);
    }

    getHistory();
  }, []);

  return (
    <View className="p-2">
      {workouts.map((workout) => {
        return (
          <WorkoutItem
            key={workout.workout.workoutId}
            workout={workout}
            exercise={exercise}
          />
        );
      })}
    </View>
  );
}

export default History;
