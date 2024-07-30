import React, { useEffect, useState } from "react";
import { getWorkoutInfo } from "../../../../database/database";
import { FlatList, Text, View } from "react-native";
import WorkoutExercise from "../../Workout/Edit/WorkoutExercise";
function Edit({ workoutId }) {
  const [excercises, setExcercises] = useState([]);
  // {exerciseId: {setId: set}}
  const [setsToUpdate, setSetsToUpdate] = useState({});
  // [setId]
  const [ setsToDelete, setSetsToDelete] = useState([]);
  useEffect(() => {
    getWorkoutInfo(workoutId).then((data) => {
      setExcercises(data.exercises);
      // initial sets
      for (const exercise of data.exercises) {
        setSetsToUpdate((prev) => {
          const newPrev = { ...prev };
          newPrev[exercise.exerciseId] = [];
          return newPrev;
        });
      }
      for (const set of data.sets) {
        setSetsToUpdate((prev) => {
          const newPrev = { ...prev };
          newPrev[set.exerciseId].push(set);
          return newPrev;
        });
      }
    });
  }, []);
  console.log(setsToDelete);

  return (
    <View>
      <Text>Edit</Text>
      <FlatList
        data={excercises}
        renderItem={({ item }) => (
          <WorkoutExercise
            exercise={item}
            setsToUpdate={setsToUpdate}
            setSetsToUpdate={setSetsToUpdate}
            setSetsToDelete={setSetsToDelete}
          />
        )}
        className="  h-5"
      />
    </View>
  );
}

export default Edit;
