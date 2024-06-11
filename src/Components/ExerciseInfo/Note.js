import React, { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { langChoice } from "../../utility/functions/langChoice";
import { LanguageContext } from "../../../context/LanguageContext";
import { ARABIC, ENGLISH } from "../../utility/labels";
import { ThemeContext } from "../../../context/ThemeContext";

function Note({ text }) {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  return (
    <View className="mt-10 w-[90%] ">
      <View
        className={` border-${langChoice(language, "l", "r")}-4 rounded px-1 ${
          theme.border
        }  w-full`}
      >
        <Text
          style={{ fontFamily: langChoice(language, "en", "ar") }}
          className={`text-xl ${langChoice(
            language,
            "text-left",
            "text-right"
          )} ${theme.textPrimary}`}
        >
          {langChoice(language, ENGLISH.NOTES, ARABIC.NOTES)}
        </Text>
      </View>
      <View
        className={
          "p-2  border rounded  max-h-[50%]  w-full mt-3 " + theme.border
        }
      >
        <ScrollView className="h-full">
          <Text
            className={"text-xs text-center " + theme.textPrimary}
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
