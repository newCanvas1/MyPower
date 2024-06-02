import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Popover from "react-native-popover-view/dist/Popover";

function CustomPopover({
  showPopover,
  setShowPopover,
  content,
  popOverheight,
  popOverwidth,
}) {
  const { height, width } = Dimensions.get("screen");
  return (
    <Popover
      isVisible={showPopover}
      onRequestClose={() => setShowPopover(false)}
    >
      <View
        style={{ width: popOverwidth * width, height: popOverheight * height, padding: 10 }}
      >
        {content}
      </View>
    </Popover>
  );
}

export default CustomPopover;
