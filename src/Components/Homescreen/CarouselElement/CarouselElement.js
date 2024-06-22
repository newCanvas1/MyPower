import React, { useContext, useEffect, useRef, useState } from "react";
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
    AsyncStorage.getItem("currentCarouselIndex").then((index) => {
      if (index) {
        setCurrentIndex(parseInt(index));
      }
    });
    setCharts((prev) => [
      <WorkoutsCalender />,
      ...chartExercises.map((chart) => (
        <Charts exercise={{ exerciseId: chart.exerciseId }} />
      )),
    ]);
  }, [chartExercises]);

  return (
    <View className={"mt-4  h-[100%]"}>
      <Carousel
        defaultIndex={currentIndex || 0}
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
