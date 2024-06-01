import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/styles";
import { insertPlan } from "../../../database/database";
function CreatePlanForm(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  function goBack() {
    router.dismiss();
  }
  async function createPlan() {
    await insertPlan(name, "none", description);
    router.dismiss();
  }
  return (
    <View className="flex-col items-center justify-center  h-screen">
      <TextInput
        className={styles.userTextInput}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        className={styles.userTextInput}
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
      />
      <View className="gap-5 mt-5">
        <TouchableOpacity
          className="bg-green-400 rounded p-1 "
          onPress={createPlan}
        >
          <Text className="text-xl text-white font-bold">Create</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-red-500 rounded p-1 " onPress={goBack}>
          <Text className="text-xl text-white font-bold">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CreatePlanForm;
