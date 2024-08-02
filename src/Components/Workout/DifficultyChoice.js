import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
const DIFFICULTY = [
  {
    id: 1,
    name: "1",
  },
  {
    id: 2,
    name: "2",
  },
  {
    id: 3,
    name: "3",
  },
  {
    id: 4,
    name: "4",
  },
  {
    id: 5,
    name: "5",
  },
  {
    id: 6,
    name: "6",
  },
  {
    id: 7,
    name: "7",
  },
  {
    id: 8,
    name: "8",
  },
  {
    id: 9,
    name: "9",
  },
  {
    id: 10,
    name: "10",
  },
];
function DifficultyChoice({ difficulty, setDifficulty }) {
  function difficultyChanged(id) {
    setDifficulty(id);
  }
  return (
    <View className=" flex-row items-center justify-center flex-1 ">
      {DIFFICULTY.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => difficultyChanged(item.id)}
            key={index}
            className={`${
              item.id == difficulty ? "bg-gray-400" : "bg-yellow-400"
            } rounded p-1 px-2 m-1 justify-center items-center `}
          >
            <Text
              className={`${item.color} text-xs font-bold`}
              style={{ fontFamily: "ar" }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default DifficultyChoice;
