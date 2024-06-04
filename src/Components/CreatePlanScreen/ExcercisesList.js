import React, { useContext, useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { DatabaseContext } from "../../../context/DataContext";
import Icon from "react-native-vector-icons/AntDesign";
function ExcercisesList() {
  const { excerciseToAdd, exercises, setExcerciseToAdd } =
    useContext(DatabaseContext);
  const ExcerciseItem = ({ item }) => {
    return (
      <View className="flex-row justify-between items-center rounded  bg-green-300 py-2 px-2 shadow">
        <Text style={{ fontFamily: "appFont" }} className=" font-bold ">
          {item.name}
        </Text>
        <TouchableOpacity
          className="bg-red-500 text-white font-bold py-2 px-2 rounded"
          onPress={() => {
            setExcerciseToAdd(
              excerciseToAdd.filter((excercise) => excercise.index != item.index)
            );
          }}
        >
          <Icon name="delete" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  };
  useEffect(() => {}, [excerciseToAdd]);
  // get the item from exercises by id
  const items = [];
  for (let i = 0; i < excerciseToAdd.length; i++) {
    items.push({
      index: excerciseToAdd[i].index,
      ...exercises.find(
        (item) => item.exerciseId === excerciseToAdd[i].exerciseId
      ),
    });
  }
  console.log(items);
  return (
    <View className="w-[80%]  rounded p-1  h-60 ">
      {items.length == 0 ? (
        <Text
          style={{ fontFamily: "appFont" }}
          className=" self-center  opacity-40"
        >
          Add Excercises here
        </Text>
      ) : (
        <FlatList
          data={items}
          ItemSeparatorComponent={<View className="h-7" />}
          renderItem={({ item }) => <ExcerciseItem item={item} />}
          keyExtractor={(item) => item.index}
        />
      )}
    </View>
  );
}

export default ExcercisesList;
