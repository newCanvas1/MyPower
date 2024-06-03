import React, { useContext, useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { DatabaseContext } from "../../../context/DataContext";

function ExcercisesList() {
  const { excerciseToAdd, exercises, setExcerciseToAdd } =
    useContext(DatabaseContext);
  const ExcerciseItem = ({ item }) => {
    return (
      <View className="flex-row justify-between">
        <Text className="text-xl text-white font-bold">{item.name}</Text>
        <TouchableOpacity
          onPress={() => {
            setExcerciseToAdd(
              excerciseToAdd.filter((excercise) => excercise != item.id)
            );
          }}
        >
          <Text className="text-xl text-white font-bold">Remove</Text>
        </TouchableOpacity>
      </View>
    );
  };
  useEffect(() => {}, [excerciseToAdd]);
  // get the item from exercises by id
  const items = [];
  for (let i = 0; i < excerciseToAdd.length; i++) {
    items.push(exercises.find((item) => item.exerciseId === excerciseToAdd[i]));
  }
  return (
    <View className="w-[80%] bg-gray-400 rounded p-1 self-center h-60 ">
      <FlatList
        data={items}
        renderItem={({ item }) => <ExcerciseItem item={item} />}
      />
    </View>
  );
}

export default ExcercisesList;
