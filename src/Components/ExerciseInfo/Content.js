import React from "react";
import Info from "./Info";
import Charts from "./Charts";
import History from "./History";
import { View } from "react-native";

function Content({ content, exercise }) {
  return (
    <View className="mt-5  w-[100%]">
      {content == "info" ? (
        <Info exercise={exercise} />
      ) : content == "charts" ? (
        <Charts  exercise={exercise} />
      ) : (
        <History exercise={exercise} />
      )}
    </View>
  );
}

export default Content;
