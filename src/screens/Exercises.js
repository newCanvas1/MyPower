import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { LanguageContext } from "../../context/LanguageContext";
import { DatabaseContext } from "../../context/DataContext";
import { ThemeContext } from "../../context/ThemeContext";

import Exercise from "../Components/ExercisesScreen/Exercise";
import { langChoice } from "../utility/functions/langChoice";
import { ENGLISH, ARABIC } from "../utility/labels";
function Exercises(props) {
  const { language } = useContext(LanguageContext);
  const { getSortedExercises } = useContext(DatabaseContext);
  const { theme } = useContext(ThemeContext);
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    getSortedExercises().then((data) => {
      setExercises(data);
    });
  }, []);
  // this component should list exercises of same category one after another , and set the category on top of its first element
  return (
    <View>
      <Text
        className="  self-center text-2xl mt-5"
        style={{ fontFamily: langChoice(language, "en", "ar") }}
      >
        {langChoice(language, ENGLISH.EXCERCISES, ARABIC.EXCERCISES)}
      </Text>
      <ScrollView className="px-5 mt-5">
        {Object.keys(exercises).map((category) => (
          <View className="my-5" key={category}>
            <View className={"border-l-4 border-green-400 px-2 rounded "}>
              <Text
                className="text-lg"
                style={{ fontFamily: langChoice(language, "en", "ar") }}
              >
                {category}
              </Text>
            </View>
            {exercises[category].map((exercise) => (
              <Exercise exercise={exercise} key={exercise.name} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default Exercises;
