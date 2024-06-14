import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getWorkouts } from "../../../database/database";

function History({ exercise }) {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    async function getHistory() {
      const workouts = await getWorkouts();
      const workoutsList = workouts.filter((workout) => {
        for (let i = 0; i < workout.exercises.length; i++) {
          if (workout.exercises[i].exerciseId === exercise.exerciseId) {
            return true;
          } else {
            return false;
          }
        }
      });
      setWorkouts(workoutsList);
    }

    getHistory();
  }, []);
  console.log(workouts[0]); 

  return (
    <View>
      <Text>History</Text>
      {workouts.map((workout) => {
        return (
          <View key={workout.workout.workoutId}>
            <Text>Workout</Text>
            <Text>{workout.plan.name}</Text>
            <Text>Exercises</Text>
            {workout.exercises.map((e) => {
              return (
                <View key={e.exerciseId}>
                  {e.exerciseId == exercise.exerciseId ? (
                    <Text>{e.name}</Text>
                  ) : (
                    <></>
                  )}
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

export default History;
