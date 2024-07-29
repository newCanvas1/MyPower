import React, { useEffect, useState } from "react";
import { getWorkoutInfo } from "../../../../database/database";
import { FlatList, Text, View } from "react-native";
import WorkoutExercise from "../../Workout/Edit/WorkoutExercise";
function Edit({ workoutId }) {
  const [excercises, setExcercises] = useState([]);
  useEffect(() => {
    getWorkoutInfo(workoutId).then((data) => {
      setExcercises(data.exercises);
      console.log(data)
    });
  }, []);
  return (
    <View>
      <Text>Edit</Text>
      {/* <FlatList
        data={excercises}
        renderItem={({ item }) => <WorkoutExercise exercise={item} />}
        className="  h-5"
      /> */}
    </View>
  );
}

export default Edit;
