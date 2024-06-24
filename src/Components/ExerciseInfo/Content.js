import React, { useContext, useEffect, useState } from "react";
import Info from "./Info";
import Charts from "./Charts";
import History from "./History";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  deleteChart,
  insertChart,
  isExerciseInCharts,
} from "../../../database/database";
import { DatabaseContext } from "../../../context/DataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { langChoice } from "../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../utility/labels";
import { LanguageContext } from "../../../context/LanguageContext";
import { ThemeContext } from "../../../context/ThemeContext";
function Content({ content, exercise, exerciseId }) {
  const [isThisMonth, setIsThisMonth] = useState(false);
  const [isThisYear, setIsThisYear] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { updateCharts, updateWorkouts } = useContext(DatabaseContext);
  useEffect(() => {
    async function getInfo() {
      const isInCharts = await isExerciseInCharts(exerciseId, "thisMonth");
      setIsThisMonth(isInCharts);

      const isInCharts2 = await isExerciseInCharts(exerciseId, "thisYear");
      setIsThisYear(isInCharts2);
      const isInCharts3 = await isExerciseInCharts(exerciseId, "yearly");
      setIsYearly(isInCharts3);
    }
    getInfo();
  }, []);

  const ChartButton = ({ type, check }) => {
    return (
      <TouchableOpacity
        onPress={async () => {
          handleClick(type);
        }}
        className="flex-row w-14 absolute top-[40] right-8 h-8 items-center justify-center rounded z-10 border border-sky-400"
      >
        {check ? (
          <Text className="text-white">-</Text>
        ) : (
          <>
            <Text className="text-white">+</Text>
            <Feather size={12} name="home" color="white" />
          </>
        )}
      </TouchableOpacity>
    );
  };

  async function handleClick(type) {
    if (type == "thisMonth") {
      const isInCharts = await isExerciseInCharts(exerciseId, type);
      if (isInCharts) {
        await deleteChart(exerciseId, type);
        setIsThisMonth(false);
        const prevIndex = await AsyncStorage.getItem("currentCarouselIndex");
        if (prevIndex != "0") {
          await AsyncStorage.setItem(
            "currentCarouselIndex",
            (parseInt(prevIndex) - 1).toString()
          );
        }
      } else {
        await insertChart(exerciseId, "thisMonth");
        const prevIndex = await AsyncStorage.getItem("currentCarouselIndex");
        await AsyncStorage.setItem(
          "currentCarouselIndex",
          (parseInt(prevIndex) + 1).toString()
        );

        setIsThisMonth(true);
      }
    } else if (type == "thisYear") {
      const isInCharts = await isExerciseInCharts(exerciseId, type);

      if (isInCharts) {
        await deleteChart(exerciseId, type);
        const prevIndex = await AsyncStorage.getItem("currentCarouselIndex");
        if (prevIndex != "0") {
          await AsyncStorage.setItem(
            "currentCarouselIndex",
            (parseInt(prevIndex) - 1).toString()
          );
        }

        setIsThisYear(false);
      } else {
        await insertChart(exerciseId, "thisYear");
        const prevIndex = await AsyncStorage.getItem("currentCarouselIndex");
        await AsyncStorage.setItem(
          "currentCarouselIndex",
          (parseInt(prevIndex) + 1).toString()
        );
        setIsThisYear(true);
      }
    } else if (type == "yearly") {
      const isInCharts = await isExerciseInCharts(exerciseId, type);
      if (isInCharts) {
        await deleteChart(exerciseId, type);
        const prevIndex = await AsyncStorage.getItem("currentCarouselIndex");
        if (prevIndex != "0") {
          await AsyncStorage.setItem(
            "currentCarouselIndex",
            (parseInt(prevIndex) - 1).toString()
          );
        }

        setIsYearly(false);
      } else {
        await insertChart(exerciseId, "yearly");
        const prevIndex = await AsyncStorage.getItem("currentCarouselIndex");
        await AsyncStorage.setItem(
          "currentCarouselIndex",
          (parseInt(prevIndex) + 1).toString()
        );
        setIsYearly(true);
      }
    }
    updateWorkouts();
    updateCharts();
  }

  return (
    <ScrollView className=" w-[100%] h-[100%]">
      <View className="mt-5  w-[100%]">
        {content == "info" ? (
          <Info exercise={exercise} />
        ) : content == "charts" ? (
          <>
            {true ? (
              <>
                <View>
                  <ChartButton type={"thisMonth"} check={isThisMonth} />
                  <Charts exercise={exercise} type={"thisMonth"} />
                </View>
                <View>
                  <ChartButton type={"thisYear"} check={isThisYear} />
                  <Charts exercise={exercise} type={"thisYear"} />
                </View>
                <View>
                  <ChartButton type={"yearly"} check={isYearly} />
                  <Charts exercise={exercise} type={"yearly"} />
                </View>
              </>
            ) : (
              <Text
                className={`text-${theme.color} text-center`}
                style={{
                  fontSize: 20,
                  fontFamily: langChoice(language, "en", "ar"),
                }}
              >
                {langChoice(
                  language,
                  ENGLISH.NO_REGISTERED_SETS,
                  ARABIC.NO_REGISTERED_SETS
                )}
              </Text>
            )}
          </>
        ) : (
          <History exercise={exercise} />
        )}
      </View>
    </ScrollView>
  );
}

export default Content;
