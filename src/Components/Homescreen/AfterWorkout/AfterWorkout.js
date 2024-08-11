import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { langChoice } from "../../../utility/functions/langChoice";
import { LanguageContext } from "../../../../context/LanguageContext";
import { ARABIC, ENGLISH } from "../../../utility/labels";
import ProgressBar from "../ProgressBar/ProgressBar";
import { WorkoutContext } from "../../../../context/WorkoutContext";
import Reward from "./Reward";
import { REWARDS } from "../../../utility/rewards";
function AfterWorkout(props) {
  const { language } = useContext(LanguageContext);
  const { sets, firstInWeek, setsNumber } = useContext(WorkoutContext);
  function setsCount() {
    let numberOfSets = 0;
    for (const exercise of Object.keys(sets)) {
      for (const set of sets[exercise]) {
        if (set.checked) {
          numberOfSets++;
        }
      }
    }
    return 1;
  }
  useEffect(() => {
    console.log(firstInWeek, "first in week");
  }, [firstInWeek]);

  function Rewards() {
    const numberOfSets = setsCount();
    return (
      <View>
        <Reward
          label={langChoice(
            language,
            ENGLISH.WORKOUT_FINISH_REWARD,
            ARABIC.WORKOUT_FINISH_REWARD
          )}
          value={REWARDS.WORKOUT_FINISH_REWARD}
        />
        {firstInWeek && (
          <Reward
            label={langChoice(
              language,
              ENGLISH.FIRST_IN_WEEK,
              ARABIC.FIRST_IN_WEEK
            )}
            value={REWARDS.WEEKLY_WORKOUT_REWARD}
          />
        )}
        {numberOfSets > 0 && (
          <Reward
            label={langChoice(language, ENGLISH.SETS_COUNT, ARABIC.SETS_COUNT)}
            value={setsNumber}
          />
        )}
      </View>
    );
  }
  return (
    <View className="flex-col justify-center items-center pt-28">
      <Text className=" text-white text-2xl" style={{ fontFamily: "en" }}>
        {langChoice(language, ENGLISH.GOOD_WORK, ARABIC.GOOD_WORK)}
      </Text>
      <ProgressBar />
      <Rewards />
    </View>
  );
}

export default AfterWorkout;
