import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";

const FallingStar = ({
  duration = 3000,
  delay = 0,
  startX = Math.random() * 300, // Random start position on X-axis
  startY = 100, // Start slightly above the screen (positive for visibility)
  peakY = 50, // Peak position (short distance upward)
  endX = Math.random() * 600 - 300, // Random end position on X-axis
  endY = 800, // End below the screen
  starSize = 30,
}) => {
  const translateYValue = useRef(new Animated.Value(startY)).current;
  const translateXValue = useRef(new Animated.Value(startX)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the star moving up first, then falling down
    Animated.sequence([
      Animated.timing(translateYValue, {
        toValue: peakY,
        duration: duration / 4, // Shorter duration for upward movement
        delay: delay,
        easing: Easing.out(Easing.quad), // Smooth upward movement
        useNativeDriver: true,
      }),
      Animated.timing(translateYValue, {
        toValue: endY,
        duration: (3 * duration) / 4, // Remaining duration for falling
        easing: Easing.in(Easing.quad), // Accelerating fall
        useNativeDriver: true,
      }),
    ]).start();

    // Simultaneously animate horizontal movement, opacity, and rotation
    Animated.parallel([
      Animated.timing(translateXValue, {
        toValue: endX,
        duration: duration,
        delay: delay,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: duration / 4,
        delay: delay,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: duration,
        delay: delay,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const animatedStyle = {
    transform: [
      { translateY: translateYValue },
      { translateX: translateXValue },
      { rotate: rotateInterpolate },
    ],
    opacity: opacityValue,
  };

  return (
    <Animated.Text style={[styles.star, animatedStyle, { fontSize: starSize }]}>
      ⭐️
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  star: {
    position: "absolute",
  },
});

export default FallingStar;
