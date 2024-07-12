import { useLocalSearchParams } from "expo-router";
import React from "react";
import DayPopover from "../../src/Components/Homescreen/WorkoutsCalender/DayPopover";
import { View } from "react-native";

function day(props) {
  const { day } = useLocalSearchParams();

  return (
    <View className="flex-col h-[100%] w-[100%] p-5 justify-center items-center ">
      <View className="h-1 w-10  rounded bg-slate-500"></View>

      <DayPopover day={day} />
    </View>
  );
}

export default day;
