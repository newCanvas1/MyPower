import React, { useContext, useEffect } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import { langChoice } from "../../utility/functions/langChoice";
import { Text } from "react-native";
import formatTime from "../../utility/functions/formatTime";
function WorkoutTimeCounter({ timePassed, setTimePassed, stopTimer }) {
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    const interval = setInterval(() => {
      if (stopTimer) {
        clearInterval(interval);
      } else {
        setTimePassed((timePassed) => timePassed + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [stopTimer]);

 

  return (
    <Text
      style={langChoice(language, "en", "ar")}
      className="text-2xl self-start"
    >
      {formatTime(timePassed)}
    </Text>
  );
}

export default WorkoutTimeCounter;
