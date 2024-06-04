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
import ColorPicker from "./ColorPicker";
function CreatePlanForm(props) {
  const [name, setName] = useState("");
  const [showExcercisePopover, setShowExcercisePopover] = useState(false);
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const { addPlan, setExcerciseToAdd } = useContext(DatabaseContext);
  const router = useRouter();
  function goBack() {
    router.dismiss();
    setExcerciseToAdd([]);
  }
  async function createPlan() {
    addPlan({ name, icon: "none", description, color });
    router.dismiss();
  }
  return (
    <View className="flex-col items-center justify-center  h-screen">
      <Text className="text-xl font-bold">Create a Plan</Text>
      <Text className="self-start ml-5">Name</Text>
      <TextInput
        className={styles.userTextInput}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
      />
      <Text className="self-start ml-5 mt-10">Description</Text>

      <TextInput
        className={styles.userTextInput}
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
      />
      <ColorPicker setColor={setColor} />

      <View className="flex-row justify-between w-[100%] gap-2 mt-1 ">
        <Text className="font-bold text-lg">Excercise</Text>
        <TouchableOpacity
          className="bg-green-400 rounded p-1 w-7 justify-center items-center"
          onPress={() => {
            setShowExcercisePopover(true);
          }}
        >
          <Text className=" text-white font-bold">+</Text>
        </TouchableOpacity>
      </View>
      <View className=" w-full mt-4 justify-center items-center ">
        <ExcercisesList />
      </View>

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
