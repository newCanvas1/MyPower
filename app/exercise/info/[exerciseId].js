import { useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { DatabaseContext } from "../../../context/DataContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { langChoice } from "../../../src/utility/functions/langChoice";
import { ENGLISH, ARABIC } from "../../../src/utility/labels";
import TitlePicture from "../../../src/Components/ExerciseInfo/TitlePicture";
import Description from "../../../src/Components/ExerciseInfo/Description";
import Note from "../../../src/Components/ExerciseInfo/Note";
import { ThemeContext } from "../../../context/ThemeContext";
import ContentSelection from "../../../src/Components/ExerciseInfo/ContentSelection";
import Content from "../../../src/Components/ExerciseInfo/Content";

function Exercise(props) {
  const { exerciseId } = useLocalSearchParams();
  const { getExercise } = useContext(DatabaseContext);
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
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
