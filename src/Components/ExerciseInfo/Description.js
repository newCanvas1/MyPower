import React, { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { langChoice } from "../../utility/functions/langChoice";
import { LanguageContext } from "../../../context/LanguageContext";
import { ARABIC, ENGLISH } from "../../utility/labels";

function Description({ text }) {
  const { language } = useContext(LanguageContext);
  return (
    <View className="mt-10 w-[90%] h-28 ">
      <ScrollView className="w-full ">
        <Text
          className="p-2 text-center"
          style={{ fontFamily: langChoice(language, "en", "ar") }}
        >
          {text?.length > 0
            ? text
            : langChoice(
                language,
                ENGLISH.NO_DESCRIPTION,
                ARABIC.NO_DESCRIPTION
              )}
        </Text>
      </ScrollView>
    </View>
  );
}

export default Description;
