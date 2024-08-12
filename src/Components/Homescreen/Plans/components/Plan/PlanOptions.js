import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { langChoice } from "../../../../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../../../../utility/labels";
import { LanguageContext } from "../../../../../../context/LanguageContext";
import { TouchableOpacity } from "react-native";
function PlanOptions({ planId }) {
  const [showDifficulty, setShowDifficulty] = useState(true);
  const [showRestTime, setShowRestTime] = useState(true);
  const { language } = useContext(LanguageContext);
  async function difficultyBoxClicked() {
    // get plansShowDifficultyList list from async storage
    let showDifficultyList = await AsyncStorage.getItem("showDifficultyList");
    showDifficultyList = JSON.parse(showDifficultyList);
    if (showDifficultyList != null) {
      for (const plan of showDifficultyList) {
        if (plan.planId == planId) {
          plan.showDifficulty = !showDifficulty;
          await AsyncStorage.setItem(
            "showDifficultyList",
            JSON.stringify(showDifficultyList)
          );
          return;
        }
      }
      showDifficultyList.push({
        planId: planId,
        showDifficulty: false,
      });
      await AsyncStorage.setItem(
        "showDifficultyList",
        JSON.stringify(showDifficultyList)
      );
    } else {
      showDifficultyList = [];
      showDifficultyList.push({
        planId: planId,
        showDifficulty: false,
      });
      await AsyncStorage.setItem(
        "showDifficultyList",
        JSON.stringify(showDifficultyList)
      );
    }
  }
  async function restTimeBoxClicked() {
    // get plansShowDifficultyList list from async storage
    let showRestTimeList = await AsyncStorage.getItem("showRestTimeList");
    showRestTimeList = JSON.parse(showRestTimeList);
    if (showRestTimeList != null) {
      // if the planId exist
      for (const plan of showRestTimeList) {
        if (plan.planId == planId) {
          plan.showRestTime = !showRestTime;
          await AsyncStorage.setItem(
            "showRestTimeList",
            JSON.stringify(showRestTimeList)
          );
          return;
        }
      }
      showRestTimeList.push({
        planId: planId,
        showRestTime: false,
      });
      await AsyncStorage.setItem(
        "showRestTimeList",
        JSON.stringify(showRestTimeList)
      );
    } else {
      showRestTimeList = [];
      showRestTimeList.push({
        planId: planId,
        showRestTime: false,
      });
      await AsyncStorage.setItem(
        "showRestTimeList",
        JSON.stringify(showRestTimeList)
      );
    }
  }
  useEffect(() => {
    // get plansShowDifficultyList list from async storage
    async function getPlansShowDifficultyList() {
      let showDifficultyList = await AsyncStorage.getItem("showDifficultyList");
      showDifficultyList = JSON.parse(showDifficultyList);
      if (showDifficultyList) {
        for (const plan of showDifficultyList) {
          if (plan.planId == planId) {
            setShowDifficulty(plan.showDifficulty);
            break;
          }
        }
      }
    }
    async function getPlansShowRestTimeList() {
      let showRestTimeList = await AsyncStorage.getItem("showRestTimeList");
      showRestTimeList = JSON.parse(showRestTimeList);
console.log(showRestTimeList);
      if (showRestTimeList) {
        for (const plan of showRestTimeList) {
          if (plan.planId == planId) {
            setShowRestTime(plan.showRestTime);
            break;
          }
        }
      }
    }
    getPlansShowDifficultyList();
    getPlansShowRestTimeList();
  }, []);
  return (
    <View
      className={`h-[30%] w-[50%] mt-10 ${langChoice(
        language,
        "left-[-25%]",
        "right-[-25%]"
      )}`}
    >
      <TouchableOpacity
        onPress={() => {
          setShowDifficulty(!showDifficulty);
          difficultyBoxClicked();
        }}
        className={`${langChoice(
          language,
          "flex-row",
          "flex-row-reverse"
        )} justify-center  p-1 `}
      >
        <BouncyCheckbox
          isChecked={showDifficulty}
          size={20}
          fillColor="green"
          unFillColor="#FFFFFF"
          innerIconStyle={{ borderWidth: 0 }}
          textStyle={{ fontFamily: "JosefinSans-Regular" }}
          onPress={() => {
            setShowDifficulty(!showDifficulty);
            difficultyBoxClicked();
          }}
        />

        <Text className="text-white mx-2 mt-1" style={{ fontFamily: "en" }}>
          {langChoice(
            language,
            ENGLISH.SHOW_DIFFICULTY,
            ARABIC.SHOW_DIFFICULTY
          )}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setShowRestTime(!showRestTime);
          restTimeBoxClicked();
        }}
        className={`${langChoice(
          language,
          "flex-row",
          "flex-row-reverse"
        )} justify-center  p-1 `}
      >
        <BouncyCheckbox
          isChecked={showRestTime}
          size={20}
          fillColor="green"
          unFillColor="#FFFFFF"
          innerIconStyle={{ borderWidth: 0 }}
          textStyle={{ fontFamily: "JosefinSans-Regular" }}
          onPress={() => {
            setShowRestTime(!showRestTime);
            restTimeBoxClicked();
          }}
        />

        <Text className="text-white mx-4 mt-1 " style={{ fontFamily: "en" }}>
          {langChoice(language, ENGLISH.SHOW_REST_TIME, ARABIC.SHOW_REST_TIME)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default PlanOptions;
