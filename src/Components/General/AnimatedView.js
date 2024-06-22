import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

const AnimatedView = ({
  content,
  fadeIn,
  fadeOut,
  enterFromRight,
  enterFromLeft,
  duration,
  wait,
  style,
}) => {
  const opacityValue = useRef(new Animated.Value(fadeIn ? 0 : 1)).current;
  const translateXValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animations = [];

    if (fadeIn) {
      animations.push(
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: duration,
          delay: wait,
          useNativeDriver: true,
        })
      );
    }

    if (fadeOut) {
      animations.push(
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: duration,
          delay: wait,
          useNativeDriver: true,
        })
      );
    }

    if (enterFromRight) {
      translateXValue.setValue(450); // Start position off-screen (right)
      animations.push(
        Animated.timing(translateXValue, {
          toValue: 0,
          duration: duration,
          delay: wait,
          useNativeDriver: true,
        })
      );
    }

    if (enterFromLeft) {
      translateXValue.setValue(-450); // Start position off-screen (left)
      animations.push(
        Animated.timing(translateXValue, {
          toValue: 0,
          duration: duration,
          delay: wait,
          useNativeDriver: true,
        })
      );
    }

    Animated.parallel(animations).start();
  }, [fadeIn, fadeOut, enterFromRight, enterFromLeft]);

  const getAnimationStyle = () => {
    const style = {};
    if (fadeIn || fadeOut) {
      style.opacity = opacityValue;
    }
    if (enterFromRight || enterFromLeft) {
      style.transform = [{ translateX: translateXValue }];
    }
    return style;
  };

  return (
    <Animated.View style={[getAnimationStyle(),style] }>
      {content}
    </Animated.View>
  );
};

export default AnimatedView;
