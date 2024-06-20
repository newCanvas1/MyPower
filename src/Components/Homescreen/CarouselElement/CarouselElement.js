import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import WorkoutsCalender from "../WorkoutsCalender/WorkoutsCalender";
import Charts from "../../ExerciseInfo/Charts";
import { DatabaseContext } from "../../../../context/DataContext";

function CarouselElement() {
  const width = Dimensions.get("window").width;
  const { chartExercises } = useContext(DatabaseContext);
  const [charts, setCharts] = useState([]);
  useEffect(() => {
    setCharts((prev) => [
      <WorkoutsCalender />,
      ...chartExercises.map((chart) => (
        <Charts exercise={{ exerciseId: chart.exerciseId }} />
      )),
    ]);
  }, [chartExercises]);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View className={"mt-10  h-[50%]"}>
      <Carousel
        loop
        width={width}
        data={charts}
        scrollAnimationDuration={300}
        onSnapToItem={(index) => setCurrentIndex(index)}
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
