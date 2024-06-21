import React, { useEffect, useRef } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";

const AnimatedView = ({ content, animationType,duration ,wait}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animation;
    switch (animationType) {
      case "fadeIn":
        animation = Animated.timing(animatedValue, {
          toValue: 1,
          duration: duration,
          delay: wait,
          useNativeDriver: true,
        });
        break;
      case "enterFromRight":
        animatedValue.setValue(450); // Start position off-screen (right)
        animation = Animated.timing(animatedValue, {
          toValue: 0,
          duration: duration,
          delay: wait,
          useNativeDriver: true,
        });
        break;
      case "enterFromLeft":
        animatedValue.setValue(-450); // Start position off-screen (left)
        animation = Animated.timing(animatedValue, {
          toValue: 0,
          duration: duration,
          delay: wait,
          useNativeDriver: true,
        });
        break;
      default:
        break;
    }
    animation.start();
  }, [animationType, animatedValue]);

  const getAnimationStyle = () => {
    switch (animationType) {
      case "fadeIn":
        return { opacity: animatedValue };
      case "enterFromRight":
      case "enterFromLeft":
        return { transform: [{ translateX: animatedValue }] };
      default:
        return {};
    }
  };

  return <Animated.View className="h-[100%]" style={[getAnimationStyle()]}>{content}</Animated.View>;
};

export default AnimatedView;
