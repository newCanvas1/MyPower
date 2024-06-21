import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { DatabaseContext } from "../../../../../../context/DataContext";
import { LanguageContext } from "../../../../../../context/LanguageContext";
import { langChoice } from "../../../../../utility/functions/langChoice";
import { ENGLISH, ARABIC } from "../../../../../utility/labels";
import ExerciseItem from "./ExerciseItem";
import { TouchableOpacity } from "react-native";
import { WorkoutContext } from "../../../../../../context/WorkoutContext";
import { ThemeContext } from "../../../../../../context/ThemeContext";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import StartButton from "./StartButton";
function PlanPopover({ planId, setShowPopover }) {
  const { getPlanExcercise, getPlan } = useContext(DatabaseContext);
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { setPlanId, setActiveWorkout } = useContext(WorkoutContext);
  const [exercises, setExercises] = useState([]);
  const [name, setName] = useState("");
  const router = useRouter();
  useEffect(() => {
    async function getInfo() {
      const data = await getPlanExcercise(planId);
      const plan = await getPlan(planId);
      setName(plan.name);
      setExercises(data);
    }
    getInfo();
  }, []);
  async function startWorkout() {
    setShowPopover(false);
    setTimeout(() => {
      setPlanId(planId);
      setActiveWorkout(true);
      router.push(`workout/${planId}`);
    }, 400);
  }
  return (
    <View className=" mt-10 items-center justify-center flex-col">
      <Text
        className={" text-2xl " + theme.textPrimary}
        style={{ fontFamily: langChoice(language, "en", "ar") }}
      >
        {name}
      </Text>
      <View className="w-full mt-5 flex-row ">
        <View className=" px-7 w-[70%] h-full">
          <Text
            className={theme.textPrimary}
            style={{ fontFamily: langChoice(language, "en", "ar") }}
          >
            {langChoice(language, ENGLISH.EXCERCISES, ARABIC.EXCERCISES)}
          </Text>
        </View>
        <Text
          className={"  flex-1 text-center " + theme.textPrimary}
          style={{ fontFamily: langChoice(language, "en", "ar") }}
        >
          {langChoice(language, ENGLISH.BEST_SET, ARABIC.BEST_SET)}
        </Text>
      </View>
      <View className="p-4 w-full">
        <FlatList
          data={exercises}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ExerciseItem exercise={item} />}
        />
      </View>
      <StartButton startWorkout={startWorkout} />
    </View>
  );
}

export default PlanPopover;
