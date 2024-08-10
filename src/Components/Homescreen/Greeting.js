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
  const waveLoop = useRef(null); // Reference to store the animation loop

  useEffect(() => {
    async function getUserName() {
      const user = await getUserInfo();
      setUserName(user?.name);

      // Slide in animation
      Animated.timing(position, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Wave animation
        waveLoop.current = Animated.loop(
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
        );

        waveLoop.current.start();

        // Stop the wave animation after 2 seconds
        setTimeout(() => {
          waveLoop.current.stop();
        }, 2000);
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

        justifyContent: "center",
      }}
    >
      <View
        className={`flex-row ${langChoice(language, "self-start", "self-end")}`}
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
        </Text>
        <Animated.Text
          className="text-4xl"
          style={{
            transform: [{ rotate: waveInterpolation }],
          }}
        >
          👋
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

export default Greeting;
