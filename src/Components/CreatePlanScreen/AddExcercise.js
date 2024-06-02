import React, { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { DatabaseContext } from "../../../context/DataContext";

function AddExcercise({ setShowAddingExcercise }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const { addExercise } = useContext(DatabaseContext);
  return (
    <View className="flex-col items-center justify-center h-screen">
      <TextInput
        className="w-[80%] bg-gray-400 rounded p-1 self-center"
        placeholder="Name"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        className="w-[80%] bg-gray-400 rounded p-1 self-center"
        placeholder="Icon"
        onChangeText={(text) => setIcon(text)}
      />
      <TextInput
        className="w-[80%] bg-gray-400 rounded p-1 self-center"
        placeholder="Describtion"
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        className="w-[80%] bg-gray-400 rounded p-1 self-center"
        placeholder="Notes"
        onChangeText={(text) => setNotes(text)}
      />

      <View className="gap-5 mt-5">
        <TouchableOpacity
          className="bg-green-400 rounded p-1 "
          onPress={async () => {
            await addExercise({
              name,
              icon,
              description,
              notes,
            });
            setShowAddingExcercise(false);
          }}
        >
          <Text className="text-xl text-white font-bold">Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-400 rounded p-1 "
          onPress={() => {
            setShowAddingExcercise(false);
          }}
        >
          <Text className="text-xl text-white font-bold">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AddExcercise;
