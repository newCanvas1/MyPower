import React, { useContext } from "react";
import { View } from "react-native";
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
      <View className="h-[20%]">
        <Edit workoutId={workout.workoutId} />
      </View>

      <View className="bg-white rounded-lg p-4 w-[70%] justify-center items-center">
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
    </View>
  );
}

export default EditWorkout;
