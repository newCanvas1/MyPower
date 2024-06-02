import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "../../styles/styles";
import { DatabaseContext } from "../../../context/DataContext";
import CustomPopover from "../General/CustomPopover";
import ExcercisePopover from "./ExcercisePopover";
import ExcercisesList from "./ExcercisesList";
function CreatePlanForm(props) {
  const [name, setName] = useState("");
  const [showExcercisePopover, setShowExcercisePopover] = useState(false);
  const [description, setDescription] = useState("");
  const { addPlan, excerciseToAdd } = useContext(DatabaseContext);
  const router = useRouter();
  function goBack() {
    router.dismiss();
  }
  async function createPlan() {
    addPlan({ name, icon: "none", description });
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
      <View className="flex-row justify-between w-[80%] gap-5 mt-1">
        <Text>Excercise</Text>
        <TouchableOpacity
          className="bg-green-400 rounded p-1 "
          onPress={() => {
            setShowExcercisePopover(true);
          }}
        >
          <Text className="text-xl text-white font-bold">+</Text>
        </TouchableOpacity>
      </View>
      <ExcercisesList />

      <CustomPopover
        popOverheight={0.8}
        popOverwidth={0.8}
        showPopover={showExcercisePopover}
        setShowPopover={setShowExcercisePopover}
        content={<ExcercisePopover />}
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
