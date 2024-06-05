import React, { useContext, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DatabaseContext } from "../../../../../context/DataContext";
import CustomPopover from "../../../General/CustomPopover";
import Excercises from "./Excercise/Excercises";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Popover from "react-native-popover-view/dist/Popover";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { PopoverMode, PopoverPlacement } from "react-native-popover-view";
import { langChoice } from "../../../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../../../utility/labels";
import { LanguageContext } from "../../../../../context/LanguageContext";
function PlanItem({ item }) {
  const { deletePlan } = useContext(DatabaseContext);
  const { language } = useContext(LanguageContext);
  const [showPlanPopover, setShowPlanPopover] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showEditPopover, setShowEditPopover] = useState(false);

  const tooltipRef = useRef();
  return (
    <View>
      <TouchableOpacity
        className={`flex-col p-2 rounded-lg h-20 w-40 m-3 ${item.color} shadow`}
        onPress={() => setShowPlanPopover(true)}
      >
        <View className="flex-row justify-between">
          <Text style={{ fontFamily: "appFont" }} className=" font-bold">
            {item.name}
          </Text>
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
                  className="bg-gray-300 p-1 flex-row items-center gap-1"
                  onPress={() => deletePlan(item.id)}
                >
                  <MaterialCommunityIcons name="delete" size={15} color="red" />
                  <Text
                    style={{ fontFamily: "appFont" }}
                    className="font-bold text-red-700"
                  >
                    {langChoice(language, ENGLISH.DELETE, ARABIC.DELETE)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-gray-300 p-1 flex-row items-center gap-1"
                  onPress={() => {
                    setShowTooltip(false);
                    setTimeout(() => {
                      setShowEditPopover(true);
                    }, 500);
                  }}
                >
                  <MaterialCommunityIcons
                    name="application-edit"
                    size={15}
                    color="green"
                  />

                  <Text
                    style={{ fontFamily: "appFont" }}
                    className="font-bold text-green-700"
                  >
                    {langChoice(language, ENGLISH.EDIT, ARABIC.EDIT)}
                  </Text>
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
      <CustomPopover
        showPopover={showEditPopover}
        setShowPopover={setShowEditPopover}
        content={<Excercises planId={item.id} />}
        popOverheight={0.8}
        popOverwidth={0.8}
      />
    </View>
  );
}

export default PlanItem;
