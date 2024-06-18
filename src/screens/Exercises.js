import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { LanguageContext } from "../../context/LanguageContext";
import { DatabaseContext } from "../../context/DataContext";
import { ThemeContext } from "../../context/ThemeContext";

import Exercise from "../Components/ExercisesScreen/Exercise";
import { langChoice } from "../utility/functions/langChoice";
import { ENGLISH, ARABIC } from "../utility/labels";
function Exercises() {
  const { language } = useContext(LanguageContext);
  const { getSortedExercises, updateExercises ,exercises} = useContext(DatabaseContext);
  const { theme } = useContext(ThemeContext);
  const [exercisesList, setExercisesList] = useState([]);
  useEffect(() => {
    getSortedExercises().then((data) => {
      setExercisesList(data);
    });
  }, [updateExercises, exercises]);

  // this component should list exercises of same category one after another , and set the category on top of its first element
  return (
    <View className={theme.mainScreen + " h-[100%] "}>
      <Text
        className={"self-center text-2xl mt-5 " + theme.textPrimary}
        style={{ fontFamily: langChoice(language, "en", "ar") }}
      >
        {langChoice(language, ENGLISH.EXCERCISES, ARABIC.EXCERCISES)}
      </Text>
      <ScrollView className="px-5 mt-5">
        {Object.keys(exercisesList).map((category) => (
          <View className="my-5" key={category}>
            <View className={"border-l-4 px-2 rounded " + theme.border}>
              <Text
                className={"text-lg " + theme.textPrimary}
                style={{ fontFamily: langChoice(language, "en", "ar") }}
              >
                {category}
              </Text>
            </View>
            {exercisesList[category].map((exercise) => (
              <Exercise exercise={exercise} key={exercise.name} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default Exercises;
