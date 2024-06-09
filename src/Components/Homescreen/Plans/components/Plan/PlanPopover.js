import { useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { DatabaseContext } from "../../../../../../context/DataContext";
import { LanguageContext } from "../../../../../../context/LanguageContext";
import { langChoice } from "../../../../../utility/functions/langChoice";
import { ENGLISH, ARABIC } from "../../../../../utility/labels";
import ExerciseItem from "../../../../CreatePlanScreen/ExerciseItem";

function PlanPopover({ planId }) {
  const { getPlanExcercise, getPlan } = useContext(DatabaseContext);
  const { language } = useContext(LanguageContext);
  const [exercises, setExercises] = useState([]);
  const [name, setName] = useState("");
  useEffect(() => {
    async function getInfo() {
      const data = await getPlanExcercise(planId);
      const plan = await getPlan(planId);
      setName(plan.name);
      setExercises(data);
    }
    getInfo();
  }, []);

  return (
    <View className=" mt-10 items-center justify-center">
      <Text
        className="text-2xl"
        style={{ fontFamily: langChoice(language, "en", "ar") }}
      >
        {name}
      </Text>
      <View className="mt-5">
        <FlatList
          data={exercises}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ExerciseItem item={item} />}
        />
      </View>
    </View>
  );
}

export default PlanPopover;
