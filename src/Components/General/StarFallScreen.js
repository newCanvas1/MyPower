import React from "react";
import { View, StyleSheet } from "react-native";
import FallingStar from "./FallingStar"; // Adjust the import path as needed

const StarFallScreen = () => {
  const numberOfStars = 6; // Number of stars to render

  return (
    <View style={styles.container}>
      {Array.from({ length: numberOfStars }).map((_, index) => (
        <FallingStar
          key={index}
          duration={1500} // Random duration between 3000ms and 5000ms
          delay={Math.random() * 500} // Random delay up to 2000ms
          startX={Math.random() * 300} // Random start X position
          endX={Math.random() * 600 - 100} // Random end X position
          peakY={Math.random() * 50 + 20} // Random peak Y position slightly above the start
          endY={Math.random() * 300 + 800} // Random end Y position below screen
          starSize={Math.random() * 20 + 10} // Random star size between 20 and 40
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background to resemble the night sky
  },
});

export default StarFallScreen;
