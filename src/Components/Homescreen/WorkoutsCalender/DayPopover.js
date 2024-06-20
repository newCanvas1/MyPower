import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getWorkoutsOfDay } from "../../../../database/database";
import Workout from "../../History/Workout";
import { FlatList } from "react-native";
function DayPopover({ day }) {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    // get the workouts from that day
    getWorkoutsOfDay(day).then((workouts) => {
      setWorkouts(workouts);
    });
  }, []);
  return (
    <View className="h-full w-full justify-center items-center py-10">
      <FlatList
        className="h-full w-[80%]"
        data={workouts}
        ItemSeparatorComponent={
          <View
            style={{
              height: 20,
            }}
          />
        }
        renderItem={({ item }) => <Workout key={item.id} item={item} />}
      />
    </View>
  );
}

export default DayPopover;
