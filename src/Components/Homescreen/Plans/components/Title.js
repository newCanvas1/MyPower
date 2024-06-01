import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function Title(props) {
  const router = useRouter();
  function addPlan() {
    router.push("/createPlan");
  }
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-2xl font-bold ">Plans</Text>
      <TouchableOpacity className="bg-green-300 rounded p-1" onPress={addPlan}>
        <Text className="  text-xl  ">+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Title;
