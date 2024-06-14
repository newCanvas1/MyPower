import { useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { DatabaseContext } from "../../../context/DataContext";

import ContentSelection from "../../../src/Components/ExerciseInfo/ContentSelection";
import Content from "../../../src/Components/ExerciseInfo/Content";

function Exercise(props) {
  const { exerciseId } = useLocalSearchParams();
  const { getExercise } = useContext(DatabaseContext);

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
      <View className="h-1 w-16 mb-10 bg-slate-500"></View>
      <ContentSelection content={content} setContent={setContent} />
      <Content content={content} exercise={exercise} />
    </View>
  );
}

export default Exercise;
