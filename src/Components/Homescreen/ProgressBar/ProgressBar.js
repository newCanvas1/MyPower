import React, { useContext, useEffect, useRef, useState } from "react";
import { Text, View, Animated } from "react-native";
import { ProgressContext } from "../../../../context/ProgressContext";
import { TouchableOpacity } from "react-native";

function ProgressBar() {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const { level, currentXp, totalXp } = useContext(ProgressContext);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const newProgress = ((currentXp ) / totalXp) * 100;
    setProgress(newProgress);

    // Animate the progress bar to the desired width (e.g., 20%)
    Animated.timing(progressAnim, {
      toValue: newProgress, // Change this to the percentage you want (e.g., props.progress)
      duration: 1000, // Duration of the animation in milliseconds
      useNativeDriver: false, // Set to true if you're animating transform/opacity
    }).start();
  }, [currentXp, level, totalXp]);

  return (
    <View className="w-[80%] h-[15] border shadow rounded-full self-center flex-row">
      <Text
        className=" absolute text-white text-xs left-3 z-10"
        style={{ fontFamily: "en" }}
      >
        lvl {level}
      </Text>
      <Animated.View
        className="bg-green-500 h-full"
        style={{
          width: progressAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
          }),
          borderRadius: 10,
        }}
      ></Animated.View>
      <View className="flex-row absolute right-0">
        <Text className=" text-white " style={{ fontFamily: "en" }}>
          {totalXp - currentXp}
        </Text>
        <Text className=" text-xs text-white" style={{ fontFamily: "en" }}>
          xp
        </Text>
      </View>
      
    </View>
  );
}

export default ProgressBar;
