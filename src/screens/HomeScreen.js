import { ScrollView, Text, View } from "react-native";
import Greeting from "../Components/Homescreen/Greeting";
import Plans from "../Components/Homescreen/Plans/Plans";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import WorkoutsCalender from "../Components/Homescreen/WorkoutsCalender/WorkoutsCalender";
import CarouselElement from "../Components/Homescreen/CarouselElement/CarouselElement";
function Homescreen(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <ScrollView className={" h-full " + theme.mainScreen}>
      <Greeting />
      <CarouselElement />
      <Plans />
    </ScrollView>
  );
}

export default Homescreen;
