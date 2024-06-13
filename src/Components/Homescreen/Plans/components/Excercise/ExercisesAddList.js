import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../../../../../context/LanguageContext";
import { DatabaseContext } from "../../../../../../context/DataContext";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { langChoice } from "../../../../../utility/functions/langChoice";
import Exercise from "../../../../ExercisesScreen/Exercise";
import { styles } from "../../../../../styles/styles";
import { ThemeContext } from "../../../../../../context/ThemeContext";

function ExercisesAddList({ planId }) {
  const { language } = useContext(LanguageContext);
  const { getSortedExercises, addExerciseToPlan } = useContext(DatabaseContext);
  const {theme} = useContext(ThemeContext);
  const [exercises, setExercises] = useState({});
  useEffect(() => {
    getSortedExercises().then((data) => {
      setExercises(data);
    });
  }, []);

  return (
    <ScrollView>
      <View>
        {Object.keys(exercises).map((category) => (
          <View className="my-5" key={category}>
            <View className="border-l-4 border-green-500 px-2 rounded">
              <Text
                className={"text-lg "+theme.textPrimary}
                style={{ fontFamily: langChoice(language, "en", "ar") }}
              >
                {category}
              </Text>
            </View>
            {exercises[category].map((exercise) => (
              <View
                className="  items-center  justify-between flex-row mt-3 "
                key={exercise.name}
              >
                <View className=" w-[85%]">
                  <Exercise exercise={exercise} key={exercise.name} />
                </View>
                <TouchableOpacity
                  className={styles.addBtn+ " p-1 "+theme.primary}
                  onPress={async () => {
                    await addExerciseToPlan(planId, exercise.exerciseId);
                  }}
                >
                  <Text className={" text-2xl text-center "+theme.textPrimary}>+ </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default ExercisesAddList;
