import React, { useContext } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "../../../context/ThemeContext";
import  formatDate from "../../utility/functions/formatDate";
function WorkoutItem({ workout, exercise }) {
  const { theme } = useContext(ThemeContext);
  console.log(workout);
  return (
    <View className="w-[100%] border border-white p-2 rounded-xl mt-4">
      <View key={workout.workout.workoutId}>
        <View className="flex-row justify-between">
          <Text className={"text-xl " + theme.textPrimary}>
            {workout.plan?.name}
          </Text>
          <Text className={theme.textPrimary}>
            {formatDate(workout.workout.date)}
          </Text>
        </View>
        {workout.exercises.map((e) => {
          return (
            <View key={e.exerciseId} className=" px-5">
              {e.exerciseId == exercise.exerciseId ? (
                <View>
                  <Text className={theme.textPrimary}>{e.name}</Text>
                  <View className="flex-row justify-between">
                    <Text className={theme.textPrimary}>Set</Text>
                    <Text className={theme.textPrimary}>Weight</Text>
                    <Text className={theme.textPrimary}>Reps</Text>
                  </View>
                  {workout.sets[e.exerciseId]?.map((set, index) => {
                    return (
                      <View
                        key={set.id}
                        className="flex-row justify-between mt-2"
                      >
                        <Text className={theme.textPrimary}>{index + 1}</Text>
                        <Text className={theme.textPrimary}>
                          {set.weight} kg
                        </Text>
                        <Text className={theme.textPrimary}>{set.reps}</Text>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <></>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default WorkoutItem;
