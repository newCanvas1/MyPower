import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { DatabaseContext } from "../../context/DataContext";
import Workout from "../Components/History/Workout";
import { LanguageContext } from "../../context/LanguageContext";
import { langChoice } from "../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../utility/labels";

function History(props) {
  const { getAllWorkouts } = useContext(DatabaseContext);
  const [history, setHistory] = useState([]);
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    getAllWorkouts().then((data) => {
      setHistory(data);
    });
  }, []);
  return (
    <View className="p-3">
      <Text
        style={{ fontFamily: langChoice(language, "en", "ar") }}
        className={`text-xl ${langChoice(language, "text-left", "text-right")}`}
      >
        {langChoice(language, ENGLISH.HISTORY, ARABIC.HISTORY)}
      </Text>
      <FlatList
        data={history}
        renderItem={({ item }) => <Workout item={item} />}
        className=" h-full mt-10"
        keyExtractor={(item) => item.workout.workoutId}
        ItemSeparatorComponent={() => <View style={{ height: 30 }}></View>}
      />
    </View>
  );
}

export default History;
