import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WorkoutContext } from "../../context/WorkoutContext";
import WorkoutExercise from "../../src/Components/Workout/WorkoutExercise";
import WorkoutTimeCounter from "../../src/Components/Workout/WorkoutTimeCounter";
import { langChoice } from "../../src/utility/functions/langChoice";
import { LanguageContext } from "../../context/LanguageContext";
import { ARABIC, ENGLISH } from "../../src/utility/labels";
import { useRouter } from "expo-router";
import { ThemeContext } from "../../context/ThemeContext";
import { DatabaseContext } from "../../context/DataContext";

function workout(props) {
  const { exercises, plan, save, timePassed, setTimePassed, cancel } =
    useContext(WorkoutContext);
  const { theme } = useContext(ThemeContext);
  const [stopTimer, setStopTimer] = useState(false);
  const { language } = useContext(LanguageContext);
  const { getAllWorkouts, setWorkouts } = useContext(DatabaseContext);
  const router = useRouter();
  return (
    <View
      className={
        "flex-col h-[100%] w-[100%] p-5 justify-center items-center " +
        theme.workoutScreen
      }
    >
    <View className="h-1 w-10 mb-10 bg-slate-500"></View>
    <View className="flex-row justify-between w-[100%] items-center">
        <View className="flex flex-col">
          <Text className={"text-2xl self-start " + theme.textPrimary}>
            {plan.name}
          </Text>
          <WorkoutTimeCounter
            stopTimer={stopTimer}
            timePassed={timePassed}
            setTimePassed={setTimePassed}
          />
        </View>
        <TouchableOpacity
          onPress={async () => {
            setStopTimer(!stopTimer);
            const saved = await save(timePassed);
            if (saved) {
              getAllWorkouts().then((data) => {
                setWorkouts(data);
              });

              router.back();
            }
          }}
          className="self-end justify-center bg-green-400 w-16 h-10 text-white items-center p-1 rounded"
        >
          <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
            {langChoice(language, ENGLISH.FINISH, ARABIC.FINISH)}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        className="mt-10 w-full "
        data={exercises}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => <WorkoutExercise exercise={item} />}
        keyExtractor={(item) => item.exerciseId}
      />
      <TouchableOpacity
        onPress={() => {
          cancel();
          router.back();
        }}
        className="mt-3 justify-center bg-red-400 w-[60%] h-10  items-center p-1 rounded"
      >
        <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
          {langChoice(language, ENGLISH.CANCEL, ARABIC.CANCEL)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default workout;
