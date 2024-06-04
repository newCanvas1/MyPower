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

function ExcercisePopover(props) {
  // get the data from the database
  const { exercises } = useContext(DatabaseContext);
  const [showAddingExcercise, setShowAddingExcercise] = useState(false);
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
      <FlatList
      className=" p-1 mt-5  "
      ItemSeparatorComponent={<View className="h-7" />}
        data={exercises}
        renderItem={({ item }) => <ExerciseItem exercise={item} />}
        keyExtractor={(item) => item.exerciseId}
      />
      {/* <ExcrecisesDropdown /> */}
    </View>
  );
}

export default ExcercisePopover;
