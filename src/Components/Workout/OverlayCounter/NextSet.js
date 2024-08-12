import React, { useContext } from "react";
import { Text, View } from "react-native";
import { ARABIC, ENGLISH } from "../../../utility/labels";
import { langChoice } from "../../../utility/functions/langChoice";
import { LanguageContext } from "../../../../context/LanguageContext";

function NextSet({ nextSet }) {
  const isThereRepsAndWeight = nextSet?.reps != 0 && nextSet?.weight != 0;
  const { language } = useContext(LanguageContext);

  return (
    nextSet &&
    isThereRepsAndWeight && (
      <View className=" items-center justify-center w-full">
        <Text
          className="text-white text-2xl mx-2 mt-10"
          style={{ fontFamily: "en" }}
        >
          {langChoice(language, ENGLISH.NEXT_SET, ARABIC.NEXT_SET)}
        </Text>
        <View className="flex-row justify-between w-full ">
          <View className="bg-[#222831] rounded w-full h-6 absolute  opacity-25 "></View>

          <Text
            className="text-white text-xl mx-2"
            style={{ fontFamily: "en" }}
          >
            {langChoice(language, ENGLISH.WEIGHT, ARABIC.WEIGHT)}
          </Text>
          <Text
            className="text-white text-xl mx-2"
            style={{ fontFamily: "en" }}
          >
            {langChoice(language, ENGLISH.REPS, ARABIC.REPS)}
          </Text>
        </View>
        <View className="flex-row justify-between w-full px-3">
          <Text
            className="text-white text-2xl mx-2"
            style={{ fontFamily: "en" }}
          >
            {nextSet.reps}
          </Text>
          <Text
            className="text-white text-2xl mx-2"
            style={{ fontFamily: "en" }}
          >
            {nextSet.weight}
          </Text>
        </View>
      </View>
    )
  );
}

export default NextSet;
