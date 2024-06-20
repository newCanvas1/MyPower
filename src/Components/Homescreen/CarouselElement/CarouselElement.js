import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
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
    <View className={"mt-10  h-[50%]"}>
      <Carousel
        defaultIndex={currentIndex || 0}
        loop
        width={width}
        data={charts}
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
            className={` ${
              currentIndex == index ? "w-3 bg-slate-500" : "w-2 bg-sky-300"
            } h-2  self-center rounded  mx-1`}
          ></View>
        ))}
      </View>
    </View>
  );
}

export default CarouselElement;
