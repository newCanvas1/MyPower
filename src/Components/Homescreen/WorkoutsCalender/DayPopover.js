import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getWorkoutsOfDay } from "../../../../database/database";
import Workout from "../../History/Workout";
import { FlatList } from "react-native";
import { langChoice } from "../../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../../utility/labels";
import { LanguageContext } from "../../../../context/LanguageContext";
function DayPopover({ day }) {
  const [workouts, setWorkouts] = useState([]);
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    // get the workouts from that day
    getWorkoutsOfDay(day).then((workouts) => {
      console.log(workouts,"workouts")
      setWorkouts(workouts);
    });
  }, []);
  function removeFromFrontend(workoutId) {
    setWorkouts((prev) => prev.filter((workout) => workout.workout.workoutId !== workoutId));
  }

  return (
    <View className="h-full w-full justify-center items-center py-10">
      {workouts.length > 0 ? (
        <FlatList
          className="h-full w-[80%]"
          data={workouts}
          ItemSeparatorComponent={
            <View
              style={{
                height: 20,
              }}
            />
          }
          renderItem={({ item }) => <Workout key={item.id} item={item} removeFromFrontend={removeFromFrontend} />}
        />
      ) : (
        <Text
          style={{ fontFamily: "ar" }}
          className="text-center text-2xl text-white"
        >
          {langChoice(
            language,
            ENGLISH.NO_WORKOUTS_FOR_THIS_DAY,
            ARABIC.NO_WORKOUTS_FOR_THIS_DAY
          )}
        </Text>
      )}
    </View>
  );
}

export default DayPopover;
