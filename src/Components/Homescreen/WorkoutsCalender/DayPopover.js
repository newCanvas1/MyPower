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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const { language } = useContext(LanguageContext);
  // get the workouts from that day
  const fetchWorkouts = async (page, limit) => {
    try {
      const data = await getWorkoutsOfDay(day, page, limit);
      setWorkouts((prevWorkouts) => {
        const newWorkouts = [...prevWorkouts, ...data];
        // remove duplicates
        const uniqueWorkouts = [
          ...new Set(newWorkouts.map(JSON.stringify)),
        ].map(JSON.parse);
        return uniqueWorkouts;
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    fetchWorkouts(page, limit);
  }, [page]);
  function removeFromFrontend(workoutId) {
    setWorkouts((prev) =>
      prev.filter((workout) => workout.workout.workoutId !== workoutId)
    );
  }

  return (
    <View className="h-full w-full justify-center items-center py-10">
      {workouts.length > 0 ? (
        <FlatList
          onEndReached={() => {
            setPage(page + 1);
          }}
          className="h-[200] w-[80%] "
          data={workouts}
          ItemSeparatorComponent={
            <View
              style={{
                height: 20,
              }}
            />
          }
          renderItem={({ item }) => (
            <Workout
              key={item.id}
              item={item}
              removeFromFrontend={removeFromFrontend}
            />
          )}
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
