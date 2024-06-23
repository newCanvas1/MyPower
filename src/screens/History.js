import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
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
  const { workouts } = useContext(DatabaseContext);
  // useEffect(() => {}, [workouts]);
  return (
    <View className={" p-3 h-[100%] " + theme.mainScreen}>
      <Text
        style={{ fontFamily: langChoice(language, "en", "ar") }}
        className={`  text-2xl text-center ${theme.textPrimary}`}
      >
        {langChoice(language, ENGLISH.HISTORY, ARABIC.HISTORY)}
      </Text>
      <AnimatedView
      
        fadeIn
        content={
          <FlatList
            data={workouts}
            renderItem={({ item, index }) => (
              <Workout key={index} item={item} />
            )}
            className="  mt-10 "
            ItemSeparatorComponent={() => <View style={{ height: 30 }}></View>}
          />
        }
      />
    </View>
  );
}

export default History;
