import React, { useContext } from "react";
import { Text, View } from "react-native";

function Reward({ label, value }) {
  return (
    <View className="flex-row justify-between w-[80%] items-center my-1">
      <Text className=" text-white text-xl" style={{ fontFamily: "en" }}>
        {label}
      </Text>
      <Text className="  text-xl text-green-500" style={{ fontFamily: "en" }}>
        +{value} XP
      </Text>
    </View>
  );
}

export default Reward;
