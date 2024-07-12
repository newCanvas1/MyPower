import { ScrollView, Text, View } from "react-native";
import Greeting from "../Components/Homescreen/Greeting";
import Plans from "../Components/Homescreen/Plans/Plans";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import WorkoutsCalender from "../Components/Homescreen/WorkoutsCalender/WorkoutsCalender";
import CarouselElement from "../Components/Homescreen/CarouselElement/CarouselElement";
import AnimatedView from "../Components/General/AnimatedView";
function Homescreen(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <ScrollView className={theme.mainScreen}>
      <Greeting />
      <AnimatedView
        content={<CarouselElement />}
        enterFromRight
        fadeIn
        duration={500}
        wait={500}
      />
      <AnimatedView
        style={{ marginTop: 10 }}
        content={<Plans />}
        enterFromLeft
        fadeIn
        duration={500}
        wait={500}
      />
    </ScrollView>
  );
}

export default Homescreen;
