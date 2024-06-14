import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../../../context/ThemeContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { langChoice } from "../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../utility/labels";

function ContentSelection({ content, setContent }) {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const chosenStyle =
    " w-[40%] bg-slate-500 text-white items-center h-[100%] justify-center ";
  const style =
    " w-[40%] h-[100%]    w-20 items-center justify-center "+theme.primary;
  return (
    <View className="w-[60%] flex-row justify-around  h-12 ">
      <TouchableOpacity
        className={` ${content == "info" ? chosenStyle : style} rounded `}
        onPress={() => setContent("info")}
      >
        <Text
          className={`${content == "info" ? " text-white" : ""}`}
          style={{ fontFamily: langChoice(language, "en", "ar") }}
        >
          {langChoice(language, ENGLISH.INFO, ARABIC.INFO)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={` ${content == "charts" ? chosenStyle : style}   `}
        onPress={() => setContent("charts")}
      >
        <Text
          className={`${content == "charts" ? " text-white" : ""}`}
          style={{
            fontFamily: langChoice(language, "en", "ar"),
          }}
        >
          {langChoice(language, ENGLISH.CHARTS, ARABIC.CHARTS)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={` ${content == "history" ? chosenStyle : style} rounded `}
        onPress={() => setContent("history")}
      >
        <Text
          className={`${content == "history" ? " text-white" : ""}`}
          style={{
            fontFamily: langChoice(language, "en", "ar"),
          }}
        >
          {langChoice(language, ENGLISH.HISTORY, ARABIC.HISTORY)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default ContentSelection;
