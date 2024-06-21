import React, { useContext, useState, useRef, useEffect } from "react";
import { Text, View, Animated, TouchableOpacity } from "react-native";
import { langChoice } from "../../../../../utility/functions/langChoice";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { LanguageContext } from "../../../../../../context/LanguageContext";
import { ThemeContext } from "../../../../../../context/ThemeContext";
import { ARABIC, ENGLISH } from "../../../../../utility/labels";

function StartButton({ startWorkout }) {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const [isPlayIcon, setIsPlayIcon] = useState(true);
  const opacity = useRef(new Animated.Value(1)).current;

  const toggleContent = () => {
    // Fade out
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      // Toggle the content
      setIsPlayIcon((prev) => !prev);
      // Fade in
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      toggleContent();
    }, 2000); // Change every 1 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <TouchableOpacity
      onPress={startWorkout}
      className={"  py-2 px-8 rounded w-28 items-center " + theme.primary}
    >
      <Animated.View style={{ opacity }}>
        <Text
          className={"text-xl " + theme.color}
          style={{
            fontFamily: langChoice(language, "en", "ar"),
          }}
        >
          {isPlayIcon ? (
            <FontAwesome6 name="play" size={20} color={"#06926f"} />
          ) : (
            langChoice(language, ENGLISH.START_WORKOUT, ARABIC.START_WORKOUT)
          )}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default StartButton;
