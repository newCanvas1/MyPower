import React, { useContext } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { LanguageContext } from "../../../context/LanguageContext";
import { langChoice } from "../../utility/functions/langChoice";
import { muscles } from "../../utility/muscles";

function TitlePicture({ title, muscle }) {
  console.log(title, muscle);
  const { language } = useContext(LanguageContext);
  return (
    <View className="flex-col w-full px-10 mt-20">
      <ScrollView horizontal>
        <Text
          style={{ fontFamily: langChoice(language, "en", "ar") }}
          className="text-2xl self-start w-full overflow-x-scroll h-8"
        >
          {title}
        </Text>
      </ScrollView>

      <Image
      source={muscles[`${muscle?.toLowerCase()}`]}
        style={{
          width: 200,
          height: 200,
          resizeMode: "clip",
          alignSelf: "flex-end",
        }}
      />
      {/* <View className="w-[200] h-[200] bg-slate-400 self-end mt-5"></View> */}
    </View>
  );
}

export default TitlePicture;
