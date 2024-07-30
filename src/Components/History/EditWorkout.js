import React, { useContext } from "react";
import { Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { updateWorkoutDate } from "../../../database/database";
import { DatabaseContext } from "../../../context/DataContext";
import Edit from "../Workout/Edit/Edit";
import { TouchableOpacity } from "react-native";
import { langChoice } from "../../utility/functions/langChoice";
import { LanguageContext } from "../../../context/LanguageContext";
import { ARABIC, ENGLISH } from "../../utility/labels";
function EditWorkout({ workout, setWorkout }) {
  const { language } = useContext(LanguageContext);
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
      <View className="rounded-lg p-4 justify-center items-center">
        <Edit workoutId={workout.workoutId} />

        <View className="bg-white rounded  justify-center items-center">
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
    </View>
  );
}

export default EditWorkout;
