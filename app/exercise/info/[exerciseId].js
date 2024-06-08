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

function Exercise(props) {
  const { exerciseId } = useLocalSearchParams();
  const { getExercise } = useContext(DatabaseContext);
  const { language } = useContext(LanguageContext);
  const [exercise, setExercise] = useState({});
  useEffect(() => {
    async function getExerciseInfo() {
      const exercise = await getExercise(exerciseId);
      setExercise(exercise);
    }
    getExerciseInfo();
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
      <Text
        className="text-2xl"
        style={{ fontFamily: langChoice(language, "en", "ar") }}
      >
        {langChoice(language, ENGLISH.EXERCISE, ARABIC.EXCERCISE)}
      </Text>
      <TitlePicture title={exercise.name} picture={exercise.picture} />
      <Description text={exercise.description} />
      <Note text={exercise.notes} />
    </View>
  );
}

export default Exercise;
