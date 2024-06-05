import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "../../styles/styles";

function Button({ color, func, label }) {
  return (
    <TouchableOpacity className={`bg-${color}-500 `+styles.btn} onPress={func}>
      <Text
        style={{ fontFamily: "appFont" }}
        className="text-xl text-white font-bold text-center"
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;
