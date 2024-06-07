import React from "react";
import { PopoverPlacement } from "react-native-popover-view";
import Popover from "react-native-popover-view/dist/Popover";
import Button from "./Button";
import { View } from "react-native";

function Tooltip({ setShowTooltip, showTooltip, tooltipRef, buttons }) {
  return (
    <Popover
      from={tooltipRef}
      placement={PopoverPlacement.TOP}
      arrowSize={{ width: 0, height: 0 }}
      popoverStyle={{
        backgroundColor: "rgb(230,230,230)",
        shadowColor: "black",
        shadowOpacity: 0.3,
        shadowOffset: { x: 0, y: 15 },
      }}
      verticalOffset={-10}
      noPadding
      isVisible={showTooltip}
      onRequestClose={() => {
        setShowTooltip(false);
      }}
    >
      <View className="flex-row">
        {buttons.map((button, key) => (
          <Button key={key} {...button} />
        ))}
      </View>
    </Popover>
  );
}

export default Tooltip;
