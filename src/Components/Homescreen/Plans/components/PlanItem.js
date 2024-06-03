import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DatabaseContext } from "../../../../../context/DataContext";
import CustomPopover from "../../../General/CustomPopover";
import Excercises from "./Excercise/Excercises";
function PlanItem({ item }) {
  const { deletePlan } = useContext(DatabaseContext);
  const [showPlanPopover, setShowPlanPopover] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setShowPlanPopover(true)}>
        <View
          className={`flex-col items-center justify-center  rounded-lg p-5 h-20 m-3 ${item.color} shadow`}
        >
          <Text>{item.name}</Text>
          <Text>{item.icon}</Text>
          <Text>{item.description}</Text>
          <TouchableOpacity
            className="bg-green-400 rounded  "
            onPress={() => {
              deletePlan(item.id);
            }}
          >
            <Text className=" text-white font-bold">Delete</Text>
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
