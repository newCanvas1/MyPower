import React, { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { langChoice } from "../../utility/functions/langChoice";
import { LanguageContext } from "../../../context/LanguageContext";
import { ARABIC, ENGLISH } from "../../utility/labels";

function Note({ text }) {
  const { language } = useContext(LanguageContext);
  return (
    <View className="mt-10 w-[90%] ">
      <View
        className={` border-${langChoice(
          language,
          "l",
          "r"
        )}-4 rounded px-1 border-green-500  w-full`}
      >
        <Text
          style={{ fontFamily: langChoice(language, "en", "ar") }}
          className={`text-xl ${langChoice(
            language,
            "text-left",
            "text-right"
          )}`}
        >
          {langChoice(language, ENGLISH.NOTES, ARABIC.NOTES)}
        </Text>
      </View>
      <View className="p-2  border rounded border-green-500 max-h-[50%]  w-full mt-3">
        <ScrollView className="h-full">
          <Text
            className="text-xs text-center "
            style={{ fontFamily: langChoice(language, "en", "ar") }}
          >
            {text?.length > 0
              ? text
              : langChoice(language, ENGLISH.NO_NOTES, ARABIC.NO_NOTES)}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

export default Note;
