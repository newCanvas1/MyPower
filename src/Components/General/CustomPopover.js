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
  onClose,
}) {
  const { height, width } = Dimensions.get("screen");
  const { theme } = useContext(ThemeContext);
  function closePopover() {
    setShowPopover(false);
    if (onClose) {
      onClose();
    }
  }
  return (
    <Popover
      animationConfig={{ duration: 100 }}
      popoverStyle={{ borderRadius: 50 }}
      isVisible={showPopover}
      onRequestClose={closePopover}
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
          onPress={closePopover}
        >
          <Text className="text-2xl left-[5]">X</Text>
        </TouchableOpacity>
        {content}
      </View>
    </Popover>
  );
}

export default CustomPopover;
