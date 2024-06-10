import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "../../styles/styles";
import { langChoice } from "../../utility/functions/langChoice";
import { LanguageContext } from "../../../context/LanguageContext";

function Button({ color, func, label }) {
  const { language } = useContext(LanguageContext);
  return (
    <TouchableOpacity className={`bg-${color}-500 `+styles.btn} onPress={func}>
      <Text
        style={{ fontFamily: langChoice(language,"en","ar") }}  
        className="text-xl text-white font-bold text-center"
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;
