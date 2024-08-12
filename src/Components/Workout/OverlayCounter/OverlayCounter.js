import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import formatTime from "../../../utility/functions/formatTime";
import { WorkoutContext } from "../../../../context/WorkoutContext";
import { langChoice } from "../../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../../utility/labels";
import { LanguageContext } from "../../../../context/LanguageContext";

const OverlayCounter = ({ isVisible, onClose }) => {
  const [timePassed, setTimePassed] = useState(0);
  const { overlayEndTime } = useContext(WorkoutContext);
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    let timer;
    if (isVisible) {
      setTimePassed(0); // Reset the counter when the overlay becomes visible
      timer = setInterval(() => {
        setTimePassed((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer); // Clean up the timer on component unmount or when the overlay is hidden
  }, [isVisible]);

  useEffect(() => {
    if (timePassed > overlayEndTime) {
      onClose();
    }
  }, [timePassed]);
  if (!isVisible) return null;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onClose}
      style={styles.overlay}
    >
      <View style={styles.counterContainer}>
        <View className="flex-col justify-center items-center w-full">
          <Text
            className="text-white text-2xl mx-2 mb-5"
            style={{ fontFamily: "en" }}
          >
            {langChoice(language, ENGLISH.REST_TIME, ARABIC.REST_TIME)}
          </Text>

          <View className=" rounded-2xl shadow  h-32  w-full  justify-center items-center flex-row">
            <View className="bg-[#222831] w-full absolute h-36 rounded-xl opacity-25  "></View>
            <Text style={styles.counterText}>{formatTime(timePassed)} </Text>
            <Text style={styles.counterText}>
              / {formatTime(overlayEndTime)}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        className="bg-red-400 absolute bottom-[20%] rounded px-2 py-1  "
        onPress={onClose}
      >
        <Text className="text-white text-2xl mx-2" style={{ fontFamily: "en" }}>
          {langChoice(language, ENGLISH.CLOSE, ARABIC.CLOSE)}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  counterContainer: {
    backgroundColor: "#76ABAE",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    height: "80%",
    flexDirection: "row",
    justifyContent: "center",
  },
  counterText: {
    color: "white",
    fontFamily: "en",
    fontSize: 32,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
});

export default OverlayCounter;
