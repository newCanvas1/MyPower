import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DatabaseContext } from "../../../context/DataContext";

function ExerciseItem({ exercise }) {
  const { setExcerciseToAdd, excerciseToAdd } = useContext(DatabaseContext);

  const [count, setCount] = useState(0);
  useEffect(() => {
    for (let i = 0; i < excerciseToAdd.length; i++) {
      if (excerciseToAdd[i].exerciseId == exercise.exerciseId) {
        setCount((prev) => prev + 1);
      }
    }
  }, []);
  return (
    <View className="flex-row justify-between items-center rounded  bg-green-300 py-2 px-2 shadow">
      <View className="flex-col items-center">
        <Text style={{ fontFamily: "appFont" }}>{exercise.name}</Text>
        <Text className="self-start" style={{ fontFamily: "appFont" }}>
          x {count}
        </Text>
      </View>
      <View className="flex-row items-center justify-center gap-1">
     
        <TouchableOpacity
          onPress={() => {
            setCount((prev) => prev + 1);
            setExcerciseToAdd([
              ...excerciseToAdd,
              { index: Math.random(), exerciseId: exercise.exerciseId },
            ]);
          }}
          className="bg-emerald-500 text-white font-bold p-1 items-center justify-center rounded"
        >
          <Text
            style={{ fontFamily: "appFont" }}
            className=" text-2xl text-white "
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ExerciseItem;
