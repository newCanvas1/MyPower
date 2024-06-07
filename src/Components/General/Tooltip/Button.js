import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { langChoice } from "../../../utility/functions/langChoice";
import { LanguageContext } from "../../../../context/LanguageContext";

function Button({ func, label, icon, color }) {
    const { language } = useContext(LanguageContext);
  return (
    <TouchableOpacity
      className="bg-gray-300 p-1 flex-row items-center gap-1"
      onPress={() => func()}
    >
      {icon}
      <Text
        style={{ fontFamily: langChoice(language, "en", "ar") }}
        className={`font-bold text-${color}-700`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;
