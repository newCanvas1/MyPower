import React, { useContext } from "react";
import { langChoice } from "../../../../../utility/functions/langChoice";
import { LanguageContext } from "../../../../../../context/LanguageContext";
import { Text, View } from "react-native";

function ExerciseItem({ exercise }) {
  const { language } = useContext(LanguageContext);
  return (
    <View className="flex-row items-center rounded  bg-green-300 p-4 shadow ">
      <Text
        style={{ fontFamily: langChoice(language, "en", "ar") }}
        className=" font-bold "
      >
        {exercise.name}
      </Text>
    </View>
  );
}

export default ExerciseItem;
