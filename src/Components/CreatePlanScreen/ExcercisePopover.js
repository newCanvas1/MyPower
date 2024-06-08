import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
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

function ExcercisePopover(props) {
  // get the data from the database
  const { exercises, addExercise } = useContext(DatabaseContext);
  const [showAddingExcercise, setShowAddingExcercise] = useState(false);
  const { language } = useContext(LanguageContext);
  const [searchText, setSearchText] = useState("");
  const [displayExcercises, setDisplayExcercises] = useState(exercises);
  async function add(exercise) {
    const id = await addExercise({
      name: exercise.name,
      icon: exercise.icon,
      description: exercise.description,
      notes: exercise.notes,
    });
    setDisplayExcercises([
      ...displayExcercises,
      { ...exercise, exerciseId: id },
    ]);
  }
  useEffect(() => {}, [exercises]);
  return (
    <View className="p-5">
      {!showAddingExcercise && (
        <TouchableOpacity
          className="bg-green-400 rounded p-1 w-[30%] items-center justify-center self-center"
          onPress={() => {
            setShowAddingExcercise(true);
          }}
        >
          <Text className="text-xl text-white font-bold">+</Text>
        </TouchableOpacity>
      )}
      {showAddingExcercise && (
        <AddExcercise
          addExercise={add}
          setShowAddingExcercise={setShowAddingExcercise}
        />
      )}

      <View className="  rounded p-1  h-full ">
        <Text
          style={{ fontFamily: langChoice(language, "en", "ar") }}
          className={`text-xl text-center`}
        >
          {langChoice(language, ENGLISH.EXCERCISES, ARABIC.EXCERCISES)}
        </Text>
        <TextInput
          style={{ fontFamily: langChoice(language, "en", "ar") }}
          className={
            styles.userTextInput +
            " text-2xl text-center self-center  " +
            `${langChoice(language, " text-left", " text-right")}`
          }
          placeholder={langChoice(language, ENGLISH.SEARCH, ARABIC.SEARCH)}
          onChangeText={(text) => {
            setSearchText(text);
            // search using the item name and muscle and category

            setDisplayExcercises(
              exercises.filter(
                (item) =>
                  item.name.toLowerCase().includes(text.toLowerCase()) ||
                  item.muscle.toLowerCase().includes(text.toLowerCase()) ||
                  item.category.toLowerCase().includes(text.toLowerCase())
              )
            );
          }}
        />
        {displayExcercises.length == 0 ? (
          <Text
            style={{ fontFamily: langChoice(language, "en", "ar") }}
            className=" self-center mt-5  opacity-40"
          >
            {langChoice(language, ENGLISH.NO_EXERCISES, ARABIC.NO_EXERCISES)}
          </Text>
        ) : (
          <View className=" h-[600] mt-2 pb-5">
            <FlatList
              className="h-[100%]"
              ItemSeparatorComponent={<View className="h-7" />}
              data={displayExcercises}
              renderItem={({ item }) => (
                <ExerciseItem key={item.exerciseId} exercise={item} />
              )}
              keyExtractor={(item) => item.exerciseId}
            />
          </View>
        )}
      </View>
    </View>
  );
}

export default ExcercisePopover;
