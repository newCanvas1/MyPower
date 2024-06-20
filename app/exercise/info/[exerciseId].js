import { useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DatabaseContext } from "../../../context/DataContext";

import ContentSelection from "../../../src/Components/ExerciseInfo/ContentSelection";
import Content from "../../../src/Components/ExerciseInfo/Content";
import {
  deleteChart,
  insertChart,
  isExerciseInCharts,
} from "../../../database/database";

function Exercise() {
  const { exerciseId } = useLocalSearchParams();
  const { getExercise, updateCharts, updateWorkouts } =
    useContext(DatabaseContext);
  const [addedToHomescreen, setAddedToHomescreen] = useState(false);
  useEffect(() => {
    async function checkIfExerciseInCharts() {
      const isInCharts = await isExerciseInCharts(exerciseId);
      setAddedToHomescreen(isInCharts);
    }
    checkIfExerciseInCharts();
  }, []);
  async function handleClick() {
    if (addedToHomescreen) {
      await deleteChart(exerciseId);
      setAddedToHomescreen(false);
    } else {
      await insertChart(exerciseId);
      setAddedToHomescreen(true);
    }
    updateWorkouts();
    updateCharts();
  }

  const [exercise, setExercise] = useState({});
  const [content, setContent] = useState("info");
  useEffect(() => {
    async function getExerciseInfo() {
      const exercise = await getExercise(exerciseId);
      setExercise(exercise);
    }
    getExerciseInfo();
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
      <View className="h-1 w-16  mb-10 bg-slate-500"></View>
      <TouchableOpacity
        onPress={async () => {
          await handleClick();
        }}
        className=" mb-5 border-2 border-slate-500 rounded-lg p-3 shadow-lg"
      >
        <Text className="text-white">
          {addedToHomescreen ? "Remove From Homescreen" : "Add To Homescreen"}
        </Text>
      </TouchableOpacity>
      <ContentSelection content={content} setContent={setContent} />
      <Content content={content} exercise={exercise} />
    </View>
  );
}

export default Exercise;
