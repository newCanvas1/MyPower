import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import WorkoutsCalender from "../WorkoutsCalender/WorkoutsCalender";
import Charts from "../../ExerciseInfo/Charts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DatabaseContext } from "../../../../context/DataContext";

function CarouselElement() {
  const width = Dimensions.get("window").width;
  const { chartExercises } = useContext(DatabaseContext);
  const [charts, setCharts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCharts(() => [
      <WorkoutsCalender />,
      ...chartExercises.map((chart) => (
        <Charts
          homescreen
          exercise={{ exerciseId: chart.exerciseId }}
          type={chart.type}
        />
      )),
    ]);
    // set the initial index to the last chart
    AsyncStorage.getItem("currentCarouselIndex").then((index) => {
      if (index) {
        // otherwise set the index to the value in the storage
        setCurrentIndex(parseInt(index));
      }
    });
  }, [chartExercises]);

  function getIndex(params) {
    if (currentIndex > charts.length - 1 || isNaN(currentIndex)) {
      return 0;
    }
    return currentIndex;
  }
  return (
    <View className={"mt-4  h-[310] "}>
      <Carousel
        defaultIndex={getIndex()}
        width={width}
        data={charts}
        loop={false}
        scrollAnimationDuration={300}
        onSnapToItem={async (index) => {
          setCurrentIndex(index);
          await AsyncStorage.setItem("currentCarouselIndex", index.toString());
        }}
        renderItem={({ index }) => (
          <View key={index} className="h-full">
            {charts[index]}
          </View>
        )}
      />
      <View className="flex flex-row justify-center">
        {charts.map((item, index) => (
          <View
            key={index}
            style={{
              width: currentIndex == index ? 20 : 10,
            }}
            className={` ${
              currentIndex == index ? " bg-sky-300" : "  bg-slate-500"
            } h-2  self-center rounded  mx-1`}
          ></View>
        ))}
      </View>
    </View>
  );
}

export default CarouselElement;
