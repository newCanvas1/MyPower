import React, { useContext } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Popover from "react-native-popover-view/dist/Popover";
import { ThemeContext } from "../../../context/ThemeContext";

function CustomPopover({
  showPopover,
  setShowPopover,
  content,
  popOverheight,
  popOverwidth,
}) {
  const { height, width } = Dimensions.get("screen");
  const { theme } = useContext(ThemeContext);
  return (
    <Popover
      popoverStyle={{ borderRadius: 50 }}
      isVisible={showPopover}
      onRequestClose={() => setShowPopover(false)}
    >
      <View
        className={theme.popoverScreen}
        style={{
          width: popOverwidth * width,
          height: popOverheight * height,
          padding: 0,
        }}
      >
        <TouchableOpacity
          className={
            "bg-red-500 shadow w-12 h-16 absolute top-[-25] z-50 items-center  justify-end self-start rounded-xl flex-col  "
          }
          onPress={() => setShowPopover(false)}
        >
          <Text className="text-2xl left-[5]">X</Text>
        </TouchableOpacity>
        {content}
      </View>
    </Popover>
  );
}

export default CustomPopover;
