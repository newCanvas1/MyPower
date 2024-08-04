import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { WorkoutContext } from "../../../context/WorkoutContext";
import Set from "./Set";
import AnimatedView from "../General/AnimatedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
function SetList({ exerciseId }) {
  const { sets, planId } = useContext(WorkoutContext);
  const [showDifficulty, setShowDifficulty] = useState(true);

  useEffect(() => {
    // get plansShowDifficultyList list from async storage
    async function getPlansShowDifficultyList() {
      let showDifficultyList = await AsyncStorage.getItem("showDifficulty");
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
    getPlansShowDifficultyList();
  }, [sets]);
  return (
    <FlatList
      className=" w-full "
      data={sets[exerciseId]}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({ item, index }) => (
        <AnimatedView
          duration={400}
          fadeIn
          content={<Set showDifficulty={showDifficulty} set={item} count={index + 1} />}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

export default SetList;
