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
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LanguageContext } from "../../../context/LanguageContext";
import { ARABIC, ENGLISH } from "../../utility/labels";
import { langChoice } from "../../utility/functions/langChoice";
import Button from "../General/Button";
function CreatePlanForm(props) {
  const [name, setName] = useState("");
  const [showExcercisePopover, setShowExcercisePopover] = useState(false);
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const { addPlan, setExcerciseToAdd } = useContext(DatabaseContext);
  const { language } = useContext(LanguageContext);
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
    <View className="flex-col items-center mt-10 h-screen">
      <View
        className={`${langChoice(
          language,
          "flex-row-reverse",
          "flex-row"
        )} w-[100%] gap-2 items-center justify-center`}
      >
        <Text         style={{ fontFamily: langChoice(language,"en","ar") }}
 className="text-xl font-bold">
          {langChoice(language, ENGLISH.CREATE_A_PLAN, ARABIC.CREATE_A_PLAN)}
        </Text>
        <View className="bg-green-500 rounded p-1 shadow">
          <Icon name="newspaper" size={20} color="white" />
        </View>
      </View>
      <Text
        style={{ fontFamily: langChoice(language,"en","ar") }}
        className={`${langChoice(
          language,
          "self-start",
          "self-end"
        )} mx-5 mt-20`}
      >
        {langChoice(language, ENGLISH.NAME, ARABIC.NAME)}
      </Text>
      <TextInput
        style={{ fontFamily: langChoice(language,"en","ar") }}
        className={
          styles.userTextInput +
          `${langChoice(language, " text-left", " text-right")}`
        }
        placeholder={langChoice(
          language,
          ENGLISH.ENTER_A_NAME,
          ARABIC.ENTER_A_NAME
        )}
        onChangeText={(text) => setName(text)}
      />
      <Text
        style={{ fontFamily: langChoice(language,"en","ar") }}
        className={`${langChoice(language, "self-start", "self-end")} mx-5`}
      >
        {langChoice(language, ENGLISH.DESCRIBTION, ARABIC.DESCRIBTION)}
      </Text>

      <TextInput
        style={{ fontFamily: langChoice(language,"en","ar") }}
        className={
          styles.userTextInput +
          `${langChoice(language, " text-left", " text-right")}`
        }
        placeholder={langChoice(
          language,
          ENGLISH.ENTER_A_DESCRIPTION,
          ARABIC.ENTER_A_DESCRIPTION
        )}
        onChangeText={(text) => setDescription(text)}
      />
      <ColorPicker setColor={setColor} />

      <View
        className={`${langChoice(
          language,
          "flex-row",
          "flex-row-reverse"
        )} justify-between w-[100%] gap-2 mt-1 `}
      >
        <View
          className={`${langChoice(
            language,
            "flex-row-reverse",
            "flex-row"
          )} gap-1 justify-between items-center`}
        >
          <Text         style={{ fontFamily: langChoice(language,"en","ar") }}
 className="font-bold text-lg">
            {langChoice(language, ENGLISH.EXCERCISES, ARABIC.EXCERCISES)}
          </Text>
          <View className="bg-green-500 rounded p-1 shadow">
            <MaterialCommunityIcons
              name="weight-lifter"
              size={25}
              color="white"
            />
          </View>
        </View>
        <TouchableOpacity
          className="bg-green-500 rounded p-1 w-9 justify-center items-center shadow"
          onPress={() => {
            setShowExcercisePopover(true);
          }}
        >
          <Text className=" text-white text-xl font-bold">+</Text>
        </TouchableOpacity>
      </View>
      <View className=" w-full mt-4 justify-center items-center ">
        <ExcercisesList />
      </View>

      <CustomPopover
        popOverheight={0.85}
        popOverwidth={0.9}
        showPopover={showExcercisePopover}
        setShowPopover={setShowExcercisePopover}
        content={<ExcercisePopover />}
      />
      <View className="flex-co h-28 justify-between mt-10">
        <Button
          color="green"
          func={createPlan}
          label={langChoice(language, ENGLISH.CONFIRM, ARABIC.CONFIRM)}
        />
        <Button
          color="red"
          func={goBack}
          label={langChoice(language, ENGLISH.CANCEL, ARABIC.CANCEL)}
        />
      </View>
    </View>
  );
}

export default CreatePlanForm;
