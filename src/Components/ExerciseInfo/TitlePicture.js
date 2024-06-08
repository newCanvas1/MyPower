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
      <View className=" self-end p-1 shadow border border-green-500 items-center justify-center bg-[#f6f6f4] w-[60%] rounded">
        <Image
          source={muscles[`${muscle?.toLowerCase()}`]}
          className="w-[200] h-[180] "
        />
      </View>
    </View>
  );
}

export default TitlePicture;
