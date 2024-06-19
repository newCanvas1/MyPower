import { Text, View } from "react-native";
import Greeting from "../Components/Homescreen/Greeting";
import Plans from "../Components/Homescreen/Plans/Plans";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import WorkoutsCalender from "../Components/Homescreen/WorkoutsCalender/WorkoutsCalender";
function Homescreen(props) {
  const { theme } = useContext(ThemeContext);
   
  return (
    <View className={" h-full " + theme.mainScreen}>
      <Greeting />
      <WorkoutsCalender />
      <Plans />
    </View>
  );
}

export default Homescreen;
