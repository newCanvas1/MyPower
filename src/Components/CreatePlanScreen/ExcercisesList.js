import React, { useContext, useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { DatabaseContext } from "../../../context/DataContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { langChoice } from "../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../utility/labels";
import ExerciseItem from "./ExerciseItem";
function ExcercisesList() {
  const { excerciseToAdd, exercises, setExcerciseToAdd } =
    useContext(DatabaseContext);
  const { language } = useContext(LanguageContext);
  async function deleteExcercise(item) {
    setExcerciseToAdd(
      excerciseToAdd.filter((excercise) => excercise.index != item.index)
    );
  }
  useEffect(() => {}, [excerciseToAdd]);
  // get the item from exercises by id
  const items = [];
  for (let i = 0; i < excerciseToAdd.length; i++) {
    items.push({
      index: excerciseToAdd[i].index,
      ...exercises.find(
        (item) => item.exerciseId === excerciseToAdd[i].exerciseId
      ),
    });
  }
  return (
    <View className="w-[80%]  rounded p-1  h-60 ">
      {items.length == 0 ? (
        <Text
          style={{ fontFamily: langChoice(language, "en", "ar") }}
          className=" self-center  opacity-40"
        >
          {langChoice(
            language,
            ENGLISH.ADD_EXERCISE_HERE,
            ARABIC.ADD_EXCERCISE_HERE
          )}
        </Text>
      ) : (
        <FlatList
          data={items}
          ItemSeparatorComponent={<View className="h-7" />}
          renderItem={({ item }) => (
            <ExerciseItem item={item} deleteItem={deleteExcercise} />
          )}
          keyExtractor={(item) => item.index}
        />
      )}
    </View>
  );
}

export default ExcercisesList;
