import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { WorkoutContext } from "../../../../context/WorkoutContext";
import formatTime from "../../../utility/functions/formatTime";

function RestTime() {
  const { overlayEndTime, setOverlayEndTime } =
    useContext(WorkoutContext);
  const buttonStyle = " bg-sky-300 rounded px-2 py-1 ";
  function addRestTime() {
    setOverlayEndTime(overlayEndTime + 5);
  }
  function deductRestTime() {
    if (overlayEndTime == 5) return;
    setOverlayEndTime(overlayEndTime - 5);
  }


  return (
    <View className=" flex-row items-center">
      <TouchableOpacity className={buttonStyle} onPress={deductRestTime}>
        <Text>-</Text>
      </TouchableOpacity>
      <Text className="text-white text-2xl mx-2" style={{ fontFamily: "en" }}>
        {formatTime(overlayEndTime)}
      </Text>
      <TouchableOpacity className={buttonStyle} onPress={addRestTime}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RestTime;
