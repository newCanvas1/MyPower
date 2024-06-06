import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../../styles/styles";
import { LanguageContext } from "../../../../../context/LanguageContext";
import { langChoice } from "../../../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../../../utility/labels";
import Icon from "react-native-vector-icons/MaterialIcons";

function Title(props) {
  const { language } = useContext(LanguageContext);
  const router = useRouter();
  function addPlan() {
    router.push("/createPlan");
  }
  return (
    <View
      className={`${langChoice(
        language,
        " flex-row",
        "flex-row-reverse"
      )} items-center justify-between `}
    >
      <View
        className={`${langChoice(
          language,
          "flex-row-reverse",
          "flex-row"
        )} items-center justify-between gap-2`}
      >
        <Text
          style={{ fontFamily: langChoice(language, "en", "ar") }}
          className="text-2xl font-bold "
        >
          {langChoice(language, ENGLISH.PLANS, ARABIC.PLANS)}
        </Text>
        <View className="bg-green-500 rounded p-1 shadow">
          <Icon name="newspaper" size={20} color="white" />
        </View>
      </View>
      <TouchableOpacity className={styles.addBtn} onPress={addPlan}>
        <Text className="text-xl text-white">+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Title;
