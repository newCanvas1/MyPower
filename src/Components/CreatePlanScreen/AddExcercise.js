import React, { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { DatabaseContext } from "../../../context/DataContext";
import { styles } from "../../styles/styles";

function AddExcercise({ setShowAddingExcercise }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const { addExercise } = useContext(DatabaseContext);
  return (
    <View className="flex-col items-center  h-screen">
      <Text className="text-xl" style={{ fontFamily: "appFont" }}>
        Add Exercise
      </Text>
      <View className="h-32"></View>
      <Text className=" self-start" style={{ fontFamily: "appFont" }}>
        Name
      </Text>
      <TextInput
        style={{ fontFamily: "appFont" }}
        className={styles.userTextInput}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
      />

      {/* <TextInput
        style={{ fontFamily: "appFont" }}
        className={styles.userTextInput}
        placeholder="Icon"
        onChangeText={(text) => setIcon(text)}
      /> */}
      <Text className=" self-start" style={{ fontFamily: "appFont" }}>
        Describtion
      </Text>
      <TextInput
        style={{ fontFamily: "appFont" }}
        className={styles.userTextInput}
        placeholder="Describtion"
        onChangeText={(text) => setDescription(text)}
      />
      <Text className=" self-start" style={{ fontFamily: "appFont" }}>
        Notes
      </Text>
      <TextInput
        style={{ fontFamily: "appFont" }}
        className={styles.userTextInput}
        placeholder="Notes"
        onChangeText={(text) => setNotes(text)}
      />

      <View className="gap-5 mt-5">
        <TouchableOpacity
          className="bg-green-400 rounded p-1 items-center "
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
          <Text
            style={{ fontFamily: "appFont" }}
            className="text-xl text-white font-bold"
          >
            Add
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-400 rounded p-1 "
          onPress={() => {
            setShowAddingExcercise(false);
          }}
        >
          <Text
            style={{ fontFamily: "appFont" }}
            className="text-xl text-white font-bold"
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AddExcercise;
