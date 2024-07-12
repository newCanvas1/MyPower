import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DatabaseContext } from "../../../context/DataContext";
import AddExcercise from "./AddExcercise";
import ExerciseItem from "./ExerciseAdd";
import { LanguageContext } from "../../../context/LanguageContext";
import { langChoice } from "../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../utility/labels";
import { styles } from "../../styles/styles";
import AnimatedSearchInput from "./AnimatedTextInput";
import { ThemeContext } from "../../../context/ThemeContext";

function ExcercisePopover(props) {
  // get the data from the database
  const { exercises, addExercise } = useContext(DatabaseContext);
  const [showAddingExcercise, setShowAddingExcercise] = useState(false);
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const [searchText, setSearchText] = useState("");
  const [displayExcercises, setDisplayExcercises] = useState({});
  async function add(exercise) {
    const id = await addExercise({
      name: exercise.name,
      icon: exercise.icon,
      description: exercise.description,
      notes: exercise.notes,
      category: exercise.category,
    });
    setDisplayExcercises({
      ...displayExcercises,
      [exercise.category]: [
        ...(displayExcercises[exercise.category] || []),
        { ...exercise, exerciseId: id },
      ],
    });
    return id;
  }
  function organizeExercises(exercises) {
    const categoriezedExercises = {};
    for (const exercise in exercises) {
      categoriezedExercises[exercises[exercise].category] = [
        ...(categoriezedExercises[exercises[exercise].category] || []),
        exercises[exercise],
      ];
    }
    return categoriezedExercises;
  }
  useEffect(() => {
    const orgnized = organizeExercises(exercises);
    setDisplayExcercises(orgnized);
  }, [exercises]);
  return (
    <View className="p-3 py-16">
      {!showAddingExcercise && (
        <TouchableOpacity
          className={
            " rounded p-1 w-[30%] items-center justify-center self-center border-2 " +
            theme.workoutCard
          }
          onPress={() => {
            setShowAddingExcercise(true);
          }}
        >
          <Text className={" font-bold " + theme.textPrimary}>Add New</Text>
        </TouchableOpacity>
      )}

      {showAddingExcercise ? (
        <AddExcercise
          setShowAddingExcercise={setShowAddingExcercise}
          addExercise={add}
        />
      ) : (
        <>
          <View className="  rounded p-1  h-full ">
            <Text
              style={{ fontFamily: langChoice(language, "en", "ar") }}
              className={`text-xl text-center ${theme.textSecondary}`}
            >
              {langChoice(language, ENGLISH.EXCERCISES, ARABIC.EXCERCISES)}
            </Text>
            <AnimatedSearchInput
              searchWords={[
                langChoice(
                  language,
                  `${ENGLISH.SEARCH}  `,
                  `${ARABIC.SEARCH}  `
                ),
                "Biceps  ",
                "Legs ",
                "Chest ",
              ]}
              style={{ fontFamily: langChoice(language, "en", "ar") }}
              className={
                styles.userTextInput +
                " text-xs text-center self-center  " +
                `${langChoice(language, " text-left", " text-right")}`
              }
              onChangeText={(text) => {
                setSearchText(text);
                // search using the item name and muscle and category
                const searchResults = exercises.filter(
                  (item) =>
                    item.name?.toLowerCase().includes(text.toLowerCase()) ||
                    item.muscle?.toLowerCase().includes(text.toLowerCase()) ||
                    item.category?.toLowerCase().includes(text.toLowerCase())
                );

                const orgnized = organizeExercises(searchResults);
                setDisplayExcercises(organizeExercises(searchResults));
              }}
            />

            {Object.keys(displayExcercises).length == 0 ? (
              <Text
                style={{ fontFamily: langChoice(language, "en", "ar") }}
                className=" self-center mt-5 text-gray-400"
              >
                {langChoice(
                  language,
                  ENGLISH.NO_EXERCISES,
                  ARABIC.NO_EXERCISES
                )}
              </Text>
            ) : (
              <ScrollView>
                {Object.keys(displayExcercises).map((category) => (
                  <View className="mt-5" key={category}>
                    <View
                      className={
                        "border-l-4 px-2 rounded  " + theme.setInputBorder
                      }
                    >
                      <Text
                        className={"text-lg " + theme.textPrimary}
                        style={{ fontFamily: langChoice(language, "en", "ar") }}
                      >
                        {category}
                      </Text>
                    </View>
                    {displayExcercises[category].map((item) => (
                      <ExerciseItem key={item.exerciseId} exercise={item} />
                    ))}
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </>
      )}
    </View>
  );
}

export default ExcercisePopover;
