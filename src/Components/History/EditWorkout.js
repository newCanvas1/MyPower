import React, { useContext } from "react";
import { Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { updateWorkoutDate } from "../../../database/database";
import { DatabaseContext } from "../../../context/DataContext";
import Edit from "../Workout/Edit/Edit";

function EditWorkout({ workout, setWorkout }) {
  const date = new Date(workout.date);
  const { updateWorkouts } = useContext(DatabaseContext);
  async function updateDate(date) {
    const newWorkoutId = workout.workoutId;
    const updated = await updateWorkoutDate(newWorkoutId, date);
    if (updated) {
      setWorkout((prev) => {
        return {
          ...prev,
          date: date,
        };
      });
      updateWorkouts();
    }
  }

  return (
    <View className=" items-center h-[100%] py-5">
      <View className=" p-4 justify-center items-center">
        <View className="bg-slate-300 rounded w-[250] justify-center py-2 items-center pr-2">
          <DateTimePicker
            mode="datetime"
            value={date}
            onChange={(event, date) => {
              if (event.type == "set") {
                updateDate(date);
              }
            }}
          />
        </View>
        <Edit workoutId={workout.workoutId} />
      </View>
    </View>
  );
}

export default EditWorkout;
