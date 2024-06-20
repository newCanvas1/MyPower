import * as React from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import WorkoutsCalender from "../WorkoutsCalender/WorkoutsCalender";

function CarouselElement(props) {
  const width = Dimensions.get("window").width;
  const list = [<WorkoutsCalender />, <Text>test</Text>];
  const [currentIndex, setCurrentIndex] = React.useState(0);
  return (
    <View className={"mt-20  h-[50%]"}>
      <Carousel
        loop
        width={width}
        data={list}
        scrollAnimationDuration={500}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ index }) => (
          <View key={index} className="h-full">
            {list[index]}
          </View>
        )}
      />
      <View className="flex flex-row justify-center">
        {list.map((item, index) => (
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
