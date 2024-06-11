import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DatabaseContext } from "../../../context/DataContext";
import { langChoice } from "../../utility/functions/langChoice";
import { useRouter } from "expo-router";
import { ThemeContext } from "../../../context/ThemeContext";

function ExerciseItem({ exercise }) {
  const { setExcerciseToAdd, excerciseToAdd } = useContext(DatabaseContext);
  const { language } = useContext(DatabaseContext);
  const {theme} =useContext(ThemeContext)
  const router = useRouter();
  const [count, setCount] = useState(0);
  useEffect(() => {
    for (let i = 0; i < excerciseToAdd.length; i++) {
      if (excerciseToAdd[i].exerciseId == exercise.exerciseId) {
        setCount((prev) => prev + 1);
      }
    }
  }, []);
  return (
    <View className="flex-row w-[100%] mt-5 px-2 justify-between items-center shadow">
      <TouchableOpacity
        onPress={() => {
          router.push(`/exercise/info/${exercise?.exerciseId}`);
        }}
        className={"flex-row justify-between items-center rounded w-[90%]  py-2 px-2 shadow "+theme.primary}
      >
        <View className="flex-col items-center">
          <Text>{exercise?.name}</Text>
          <Text
            className="self-start"
            style={{ fontFamily: langChoice(language, "en", "ar") }}
          >
            x {count}
          </Text>
        </View>
        <View className="flex-row items-center justify-center gap-1"></View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setCount((prev) => prev + 1);
          setExcerciseToAdd([
            ...excerciseToAdd,
            { index: Math.random(), exerciseId: exercise.exerciseId },
          ]);
        }}
        className={" text-white p-1 w-6 items-center justify-center rounded "+theme.primary}
      >
        <Text
          style={{ fontFamily: langChoice(language, "en", "ar") }}
          className=" text-2xl text-white "
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default ExerciseItem;
