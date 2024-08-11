import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import formatTime from "../../../utility/functions/formatTime";
import { WorkoutContext } from "../../../../context/WorkoutContext";

const OverlayCounter = ({ isVisible, onClose, startTime }) => {
  const [timePassed, setTimePassed] = useState(0);
  const { overlayEndTime, setOverlayEndTime } = useContext(WorkoutContext);
  useEffect(() => {
    let timer;
    if (isVisible) {
      setTimePassed(startTime); // Reset the counter when the overlay becomes visible
      timer = setInterval(() => {
        setTimePassed((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer); // Clean up the timer on component unmount or when the overlay is hidden
  }, [isVisible]);

  useEffect(() => {
    if (timePassed >= overlayEndTime) {
      setOverlayEndTime(0);
      onClose();
    }
  }, [timePassed]);
  if (!isVisible) return null;

  return (
    <TouchableOpacity activeOpacity={1}  onPress={onClose} style={styles.overlay}>
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{formatTime(timePassed)} </Text>
        <Text style={styles.counterText}>/ {formatTime(overlayEndTime)}</Text>

      </View>
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
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    height:"80%",
    flexDirection: "row",
    justifyContent: "center",
  },
  counterText: {
    fontSize: 32,
    marginBottom: 20,
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
