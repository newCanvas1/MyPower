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

function workout(props) {
  const { exercises, plan, save, timePassed, setTimePassed } =
    useContext(WorkoutContext);
  const [stopTimer, setStopTimer] = useState(false);
  const { language } = useContext(LanguageContext);
  const router = useRouter();
  return (
    <SafeAreaView>
      <View className="flex-col h-[100%] w-[100%] p-5 justify-center items-center">
        <View className="flex-row justify-between w-[100%] items-center">
          <View className="flex flex-col">
            <Text className="text-2xl self-start">{plan.name}</Text>
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
      </View>
    </SafeAreaView>
  );
}

export default workout;
