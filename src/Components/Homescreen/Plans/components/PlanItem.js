import React, { act, useContext, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DatabaseContext } from "../../../../../context/DataContext";
import CustomPopover from "../../../General/CustomPopover";
import Excercises from "./Excercise/Excercises";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { langChoice } from "../../../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../../../utility/labels";
import { LanguageContext } from "../../../../../context/LanguageContext";
import Tooltip from "../../../General/Tooltip/Tooltip";
import RenamePopover from "../../RenamePopover";
import { router, useRouter } from "expo-router";
import PlanPopover from "./Plan/PlanPopover";
import { WorkoutContext } from "../../../../../context/WorkoutContext";
import { ThemeContext } from "../../../../../context/ThemeContext";
function PlanItem({ item }) {
  const { deletePlan } = useContext(DatabaseContext);
  const { language } = useContext(LanguageContext);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showEditPopover, setShowEditPopover] = useState(false);
  const [showRenamePopover, setShowRenamePopover] = useState(false);
  const [showStartPopover, setShowStartPopover] = useState(false);
  const {theme} = useContext(ThemeContext);
  const { planId, activeWorkout } = useContext(WorkoutContext);
  const tooltipRef = useRef();
  const planToolTipButtons = [
    {
      func: () => deletePlan(item.id),
      label: langChoice(language, ENGLISH.DELETE, ARABIC.DELETE),
      color: "red",
      icon: <MaterialCommunityIcons name={"delete"} size={15} color={"red"} />,
    },
    {
      func: () => {
        setShowTooltip(false);
        setTimeout(() => {
          setShowEditPopover(true);
        }, 500);
      },
      label: langChoice(language, ENGLISH.EDIT, ARABIC.EDIT),
      color: "green",
      icon: (
        <MaterialCommunityIcons
          name={"application-edit"}
          size={15}
          color={"green"}
        />
      ),
    },

    {
      func: () => {
        setShowTooltip(false);
        setTimeout(() => {
          setShowRenamePopover(true);
        }, 500);
      },
      label: langChoice(language, ENGLISH.RENAME, ARABIC.RENAME),
      color: "green",
      icon: (
        <MaterialCommunityIcons name={"rename-box"} size={15} color={"green"} />
      ),
    },
  ];
  return (
    <View>
      <TouchableOpacity
        className={`flex-col p-2 rounded-lg h-20 w-40 m-3 ${item.color} shadow`}
        onPress={() => {
          if (activeWorkout) {
            router.push(`workout/${planId}`);
            return;
          }
          setShowStartPopover(true);
        }}
      >
        <View className="flex-row justify-between">
          <Text
            style={{ fontFamily: langChoice(language, "en", "ar") }}
            className=" font-bold"
          >
            {item.name}
          </Text>
          <TouchableOpacity
            ref={tooltipRef}
            className="p-1 rounded bg-gray-400 shadow w-6 items-center"
            onPress={() => setShowTooltip(true)}
          >
            <Icon name="options" size={13} color="white" />
            <Tooltip
              setShowTooltip={setShowTooltip}
              showTooltip={showTooltip}
              tooltipRef={tooltipRef}
              buttons={planToolTipButtons}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <CustomPopover
        showPopover={showEditPopover}
        setShowPopover={setShowEditPopover}
        content={<Excercises name={item.name} planId={item.id} />}
        popOverheight={0.8}
        popOverwidth={0.8}
      />
      <CustomPopover
        showPopover={showRenamePopover}
        setShowPopover={setShowRenamePopover}
        content={
          <RenamePopover
            oldName={item.name}
            setShowRenamePopover={setShowRenamePopover}
            planId={item.id}
          />
        }
        popOverheight={0.3}
        popOverwidth={0.8}
      />
      <CustomPopover
        showPopover={showStartPopover}
        setShowPopover={setShowStartPopover}
        content={
          <PlanPopover planId={item.id} setShowPopover={setShowStartPopover} />
        }
        popOverheight={0.6}
        popOverwidth={0.9}
      />
    </View>
  );
}

export default PlanItem;
