import React, { useContext, useEffect, useState, useRef } from "react";
import { Text, View, Animated } from "react-native";
import { getUserInfo } from "../../../database/database";
import { langChoice } from "../../utility/functions/langChoice";
import { LanguageContext } from "../../../context/LanguageContext";
import { ThemeContext } from "../../../context/ThemeContext";
import { ARABIC, ENGLISH } from "../../utility/labels";

function Greeting(props) {
  const [userName, setUserName] = useState("");
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const position = useRef(new Animated.Value(-100)).current; // Start above the screen
  const waveAnimation = useRef(new Animated.Value(0)).current; // For wave animation

  useEffect(() => {
    async function getUserName() {
      const user = await getUserInfo();
      setUserName(user.name);

      // Slide in animation
      Animated.timing(position, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        // Wave animation
        Animated.loop(
          Animated.sequence([
            Animated.timing(waveAnimation, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(waveAnimation, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    }
    getUserName();
  }, []);

  const waveInterpolation = waveAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "15deg"],
  });

  return (
    <Animated.View
      style={{
        transform: [{ translateY: position }],
        paddingHorizontal: 40,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{ fontFamily: "appFont" }}
        className={`text-4xl ${theme.textPrimary} ${langChoice(
          language,
          "self-start",
          "self-end"
        )}`}
      >
        {langChoice(language, ENGLISH.HI, ARABIC.HI)} {userName} ⚡️
        <Animated.Text
          style={{
            transform: [{ rotate: waveInterpolation }],
            display: "inline-block",
          }}
        >
          👋
        </Animated.Text>
      </Text>
    </Animated.View>
  );
}

export default Greeting;
