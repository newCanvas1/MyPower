import * as React from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import WorkoutsCalender from "../WorkoutsCalender/WorkoutsCalender";

function CarouselElement(props) {
  const width = Dimensions.get("window").width;
  const list = [<WorkoutsCalender />, <Text>test</Text>];
  return (
    <View className={"mt-20  h-[50%]"}>
      <Carousel
        loop
        width={width}
        data={list}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) => (
          <View key={index} className="h-full">
            {list[index]}
          </View>
        )}
      />
    </View>
  );
}

export default CarouselElement;
