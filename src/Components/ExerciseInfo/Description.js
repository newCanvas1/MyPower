import React, { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { langChoice } from "../../utility/functions/langChoice";
import { LanguageContext } from "../../../context/LanguageContext";

function Description({ text }) {
  const { language } = useContext(LanguageContext);
  return (
    <View className="mt-10 w-[90%] h-28 ">
      <ScrollView className="w-full ">
        <Text
          className="p-2"
          style={{ fontFamily: langChoice(language, "en", "ar") }}
        >
          {text}
        </Text>
      </ScrollView>
    </View>
  );
}

export default Description;
