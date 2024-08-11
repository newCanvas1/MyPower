import { ScrollView, Text, View } from "react-native";
import Greeting from "../Components/Homescreen/Greeting";
import Plans from "../Components/Homescreen/Plans/Plans";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import CarouselElement from "../Components/Homescreen/CarouselElement/CarouselElement";
import AnimatedView from "../Components/General/AnimatedView";
import ProgressBar from "../Components/Homescreen/ProgressBar/ProgressBar";
import CustomPopover from "../Components/General/CustomPopover";
import AfterWorkout from "../Components/Homescreen/AfterWorkout/AfterWorkout";
import { WorkoutContext } from "../../context/WorkoutContext";
function Homescreen(props) {
  const { theme } = useContext(ThemeContext);
  const {
    setShowAfterWorkout,
    showAfterWorkout,
    setFirstInWeek,
    setSetsNumber,
  } = useContext(WorkoutContext);
  function closeRewards() {
    setFirstInWeek(false);
    setSetsNumber(0);
  }
  return (
    <ScrollView className={theme.mainScreen}>
      <Greeting />
      <ProgressBar />
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
      <CustomPopover
        showPopover={showAfterWorkout}
        setShowPopover={setShowAfterWorkout}
        popOverheight={0.5}
        popOverwidth={0.9}
        content={<AfterWorkout />}
        onClose={closeRewards}
      />
    </ScrollView>
  );
}

export default Homescreen;
