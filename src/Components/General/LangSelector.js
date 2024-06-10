import React, { useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import { Text, TouchableOpacity, View } from "react-native";
import { langChoice } from "../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../utility/labels";

function LangSelector(props) {
  const { language, setLanguage, storeData } = useContext(LanguageContext);
  return (
    <View className="self-start items-center min-w-[100]">
      <Text
        className="mb-2 text-lg"
        style={{ fontFamily: langChoice(language, "en", "ar") }}
      >
        {langChoice(language, ENGLISH.LANGUAGE, ARABIC.LANGUAGE)}
      </Text>
      <TouchableOpacity
        className="p-2 rounded-xl bg-green-400 w-10 shadow items-center "
        onPress={() => {
          setLanguage((prev) => {
            if (prev === "ar") {
              storeData("en");
              return "en";
            } else {
              storeData("ar");
              return "ar";
            }
          });
        }}
      >
        <Text style={{ fontFamily: "Poppins-Bold", letterSpacing: 0.7 }}>
          {language.toUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default LangSelector;
