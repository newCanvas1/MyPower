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
  const { theme } = useContext(ThemeContext);
  const { planId, activeWorkout } = useContext(WorkoutContext);
  const tooltipRef = useRef();
  function getTime() {
    const date = new Date(item.lastUsed);
    if (item.lastUsed === null) {
      return "";
      
    }
    const timePassed = new Date().getTime() - date.getTime();
    const years = Math.floor(timePassed / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(timePassed / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(timePassed / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timePassed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timePassed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timePassed % (1000 * 60)) / 1000);

    if (years > 0) {
      return years + "y";
    }
    if (months > 0) {
      return months + "m";
    }
    if (days > 0) {
      return days + "d";
    }
    if (hours > 0) {
      return hours + "h";
    }
    if (minutes > 0) {
      return minutes + "m";
    }
    if (seconds > 0) {
      return "Just now";
    } else {
      return "";
    }
  }
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
    <TouchableOpacity
      className={`flex-col`}
      onPress={() => {
        if (activeWorkout) {
          router.push(`workout/${planId}`);
          return;
        }
        setShowStartPopover(true);
      }}
    >
      <View
        className={` p-2 rounded-lg w-40 h-28 m-3  ${theme.primary} shadow`}
      >
        <View className="flex-row justify-between">
          <View>
            <Text
              style={{ fontFamily: langChoice(language, "en", "ar") }}
              className={" font-bold " + theme.color}
            >
              {item.name}
            </Text>
            <Text
              style={{ fontFamily: langChoice(language, "en", "ar") }}
              className={" font-bold opacity-60 " + theme.color}
            >
              {getTime()}
            </Text>
          </View>
          <TouchableOpacity
            ref={tooltipRef}
            className=" w-9 h-9  items-center justify-center "
            onPress={() => setShowTooltip(true)}
          >
            <View className="p-1 rounded bg-gray-400 shadow w-6 items-center justify-center">
              <Icon name="options" size={13} color="white" />
              <Tooltip
                setShowTooltip={setShowTooltip}
                showTooltip={showTooltip}
                tooltipRef={tooltipRef}
                buttons={planToolTipButtons}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <CustomPopover
        showPopover={showEditPopover}
        setShowPopover={setShowEditPopover}
        content={<Excercises name={item.name} planId={item.id} />}
        popOverheight={0.8}
        popOverwidth={0.9}
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
    </TouchableOpacity>
  );
}

export default PlanItem;
