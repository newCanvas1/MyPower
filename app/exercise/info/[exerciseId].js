import { useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DatabaseContext } from "../../../context/DataContext";

import ContentSelection from "../../../src/Components/ExerciseInfo/ContentSelection";
import Content from "../../../src/Components/ExerciseInfo/Content";

function Exercise() {
  const { exerciseId } = useLocalSearchParams();
  const { getExercise } = useContext(DatabaseContext);

  const [exercise, setExercise] = useState({});
  const [content, setContent] = useState("");
  useEffect(() => {
    async function getExerciseInfo() {
      const exercise = await getExercise(exerciseId);
      setExercise(exercise);
    }
    getExerciseInfo();
    setTimeout(() => {
      setContent("charts");

    }, 50);
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
      <View className="h-1 w-16  mb-10 bg-slate-500"></View>

      <ContentSelection content={content} setContent={setContent} />
      {
        <Content
          content={content}
          exercise={exercise}
          exerciseId={exerciseId}
        />
      }
    </View>
  );
}

export default Exercise;
