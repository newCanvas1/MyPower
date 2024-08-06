import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, View, Button } from "react-native";
import { DatabaseContext } from "../../context/DataContext";
import Workout from "../Components/History/Workout";
import { LanguageContext } from "../../context/LanguageContext";
import { langChoice } from "../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../utility/labels";
import { ThemeContext } from "../../context/ThemeContext";
import AnimatedView from "../Components/General/AnimatedView";

function History() {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const { getHistory } = useContext(DatabaseContext);
  const [workoutsList, setWorkoutsList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [loading, setLoading] = useState(false);

  const fetchWorkouts = async (page, limit) => {
    setLoading(true);
    try {
      const data = await getHistory(page, limit);
      setWorkoutsList((prevWorkouts) => [...prevWorkouts, ...data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts(page, limit);
  }, [page]);

  const refreshWorkouts = async () => {
    setPage(1);  // Reset the page to 1
    setWorkoutsList([]);  // Clear the current list
    await fetchWorkouts(1, limit);  // Fetch new data
  };

  return (
    <View className={" p-3 h-[100%] " + theme.mainScreen}>
      <Text
        style={{ fontFamily: langChoice(language, "en", "ar") }}
        className={` text-2xl text-center ${theme.textPrimary}`}
      >
        {langChoice(language, ENGLISH.HISTORY, ARABIC.HISTORY)}
      </Text>
      <Button 
        title={"Refresh"}
        onPress={refreshWorkouts} 
      />
      {workoutsList?.length === 0 && !loading ? (
        <Text
          style={{ fontFamily: "ar" }}
          className={` text-sm opacity-40 mt-10 text-center text-white`}
        >
          {langChoice(language, ENGLISH.NO_WORKOUTS, ARABIC.NO_WORKOUTS)}
        </Text>
      ) : (
        <AnimatedView
          fadeIn
          content={
            <FlatList
              onEndReached={() => {
                if (!loading) {
                  setPage(page + 1);
                }
              }}
              data={workoutsList}
              renderItem={({ item }) => (
                <Workout key={item.workout.workoutId} item={item} />
              )}
              className=" my-10"
              ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
              keyExtractor={(item) => item.workout.workoutId}
            />
          }
        />
      )}
    </View>
  );
}

export default History;
