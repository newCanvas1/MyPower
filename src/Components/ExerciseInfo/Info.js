import React, { useContext } from "react";
import { Text, View } from "react-native";
import TitlePicture from "./TitlePicture";
import Description from "./Description";
import Note from "./Note";
import { LanguageContext } from "../../../context/LanguageContext";
import { ThemeContext } from "../../../context/ThemeContext";
import { langChoice } from "../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../utility/labels";

function Info({ exercise }) {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);

  return (
    <View className="flex-col w-[100%] items-center">
      <Text
        className={"text-2xl " + theme.textPrimary}
        style={{ fontFamily: langChoice(language, "en", "ar") }}
      >
        {langChoice(language, ENGLISH.EXERCISE, ARABIC.EXCERCISE)}
      </Text>
      <TitlePicture title={exercise.name} muscle={exercise.muscle} />
      <Description text={exercise.description} />
      <Note text={exercise.notes} />
    </View>
  );
}

export default Info;
