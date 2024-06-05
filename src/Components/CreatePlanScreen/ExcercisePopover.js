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
import ExcrecisesDropdown from "./ExcercisesDropdown";
import ExerciseItem from "./ExerciseItem";
import { LanguageContext } from "../../../context/LanguageContext";
import { langChoice } from "../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../utility/labels";

function ExcercisePopover(props) {
  // get the data from the database
  const { exercises } = useContext(DatabaseContext);
  const [showAddingExcercise, setShowAddingExcercise] = useState(false);
  const { language } = useContext(LanguageContext);
  useEffect(() => {}, [exercises]);
  return (
    <View>
      <TouchableOpacity
        className="bg-green-400 rounded p-1 w-[30%] items-center justify-center self-center"
        onPress={() => {
          console.log("add");
          setShowAddingExcercise(true);
        }}
      >
        <Text className="text-xl text-white font-bold">+</Text>
      </TouchableOpacity>
      {showAddingExcercise && (
        <AddExcercise setShowAddingExcercise={setShowAddingExcercise} />
      )}

      <View className="  rounded p-1  h-full ">
        <Text
          style={{ fontFamily: "appFont" }}
          className={`text-xl text-center`}
        >
          {langChoice(language, ENGLISH.EXCERCISES, ARABIC.EXCERCISES)}
        </Text>
        <FlatList
          className=" p-1 mt-5  "
          ItemSeparatorComponent={<View className="h-7" />}
          data={exercises}
          renderItem={({ item }) => <ExerciseItem exercise={item} />}
          keyExtractor={(item) => item.exerciseId}
        />
      </View>
    </View>
  );
}

export default ExcercisePopover;
