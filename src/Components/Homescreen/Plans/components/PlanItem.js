import React, { useContext, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DatabaseContext } from "../../../../../context/DataContext";
import CustomPopover from "../../../General/CustomPopover";
import Excercises from "./Excercise/Excercises";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Popover from "react-native-popover-view/dist/Popover";
import { PopoverMode, PopoverPlacement } from "react-native-popover-view";
function PlanItem({ item }) {
  const { deletePlan } = useContext(DatabaseContext);
  const [showPlanPopover, setShowPlanPopover] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef();
  return (
    <View>
      <TouchableOpacity
        className={`flex-col p-2 rounded-lg h-20 w-40 m-3 ${item.color} shadow`}
        onPress={() => setShowPlanPopover(true)}
      >
        <View className="flex-row justify-between">
          <Text className=" font-bold">{item.name}</Text>
          <TouchableOpacity
            ref={tooltipRef}
            className="p-1 rounded bg-gray-400 shadow w-6 items-center"
            onPress={() => setShowTooltip(true)}
          >
            <Icon name="options" size={13} color="white" />
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
                <TouchableOpacity
                  className="bg-red-500 p-1"
                  onPress={() => deletePlan(item.id)}
                >
                  <Text className="font-bold">Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-green-500 p-1"
                  onPress={() => setShowTooltip(false)}
                >
                  <Text className="font-bold">Edit</Text>
                </TouchableOpacity>
              </View>
            </Popover>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <CustomPopover
        showPopover={showPlanPopover}
        setShowPopover={setShowPlanPopover}
        content={<Excercises planId={item.id} />}
        popOverheight={0.8}
        popOverwidth={0.8}
      />
    </View>
  );
}

export default PlanItem;
