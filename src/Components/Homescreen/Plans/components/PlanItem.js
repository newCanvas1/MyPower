import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DatabaseContext } from "../../../../../context/DataContext";

function PlanItem({ item }) {
  const { deletePlan } = useContext(DatabaseContext);
  return (
    <View className="flex-col items-center justify-center bg-red-500 rounded-lg p-5 h-20 m-3">
      <Text>{item.name}</Text>
      <Text>{item.icon}</Text>
      <Text>{item.description}</Text>
      <TouchableOpacity
        className="bg-green-400 rounded  "
        onPress={() => {
          deletePlan(item.id);
        }}
      >
        <Text className=" text-white font-bold">Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PlanItem;
