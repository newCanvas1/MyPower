import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { langChoice } from "../../../../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../../../../utility/labels";
import { LanguageContext } from "../../../../../../context/LanguageContext";
function PlanOptions({ planId }) {
  const [showDifficulty, setShowDifficulty] = useState(true);
  const { language } = useContext(LanguageContext);
  async function difficultyBoxClicked() {
    // get plansShowDifficultyList list from async storage
    let showDifficultyList = await AsyncStorage.getItem("showDifficulty");
    showDifficultyList = JSON.parse(showDifficultyList);
    if (showDifficultyList != null) {
      const newShowDifficultyList = showDifficultyList?.map((plan) => {
        if (plan.planId == planId) {
          return { planId: planId, showDifficulty: !showDifficulty };
        } else {
          return plan;
        }
      });
      await AsyncStorage.setItem(
        "showDifficulty",
        JSON.stringify(newShowDifficultyList)
      );
    }
    await AsyncStorage.setItem(
      "showDifficulty",
      JSON.stringify([{ planId: planId, showDifficulty: !showDifficulty }])
    );
  }
  useEffect(() => {
    // get plansShowDifficultyList list from async storage
    async function getPlansShowDifficultyList() {
      let showDifficultyList = await AsyncStorage.getItem("showDifficulty");
      showDifficultyList = JSON.parse(showDifficultyList);

      if (showDifficultyList) {
        for (const plan of showDifficultyList) {
          if (plan.planId == planId) {
            console.log(showDifficultyList);
            setShowDifficulty(plan.showDifficulty);
            break;
          }
        }
      }
    }
    getPlansShowDifficultyList();
  }, []);
  return (
    <View className={`h-[30%] w-[50%] mt-10 ${langChoice(language, "left-[-25%]", "right-[-25%]")}`}>
      <View className={`${langChoice(language, "flex-row", "flex-row-reverse")} justify-center  p-1 `}>
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
      </View>
    </View>
  );
}

export default PlanOptions;
