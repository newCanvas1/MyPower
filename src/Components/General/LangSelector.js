import React, { useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import { Text, TouchableOpacity } from "react-native";

function LangSelector(props) {
  const { language, setLanguage, storeData } = useContext(LanguageContext);
  return (
    <TouchableOpacity
      className="p-2 rounded bg-slate-200 shadow"
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
      <Text style={{ fontFamily: "appFont" }} >
        {language.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
}

export default LangSelector;
