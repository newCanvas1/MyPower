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
function Content({ content, exercise, exerciseId }) {
  const [isThisMonth, setIsThisMonth] = useState(false);
  const [isThisYear, setIsThisYear] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const { updateCharts, updateWorkouts } = useContext(DatabaseContext);
  useEffect(() => {
    async function getInfo() {
      const isInCharts = await isExerciseInCharts(exerciseId, "thisMonth");
      setIsThisMonth(isInCharts);

      const isInCharts2 = await isExerciseInCharts(
exerciseId,
        "thisYear"
      );
      setIsThisYear(isInCharts2);
      const isInCharts3 = await isExerciseInCharts(
exerciseId,
        "yearly"
      );
      setIsYearly(isInCharts3);
    }
    getInfo();
  }, []);

  async function handleClick(type) {
    if (type == "thisMonth") {
      const isInCharts = await isExerciseInCharts(exerciseId, type);
      if (isInCharts) {
        await deleteChart(exerciseId, type);
        setIsThisMonth(false);
      } else {
        await insertChart(exerciseId, "thisMonth");
        setIsThisMonth(true);
      }
    } else if (type == "thisYear") {
      const isInCharts = await isExerciseInCharts(exerciseId, type);

      if (isInCharts) {
        await deleteChart(exerciseId, type);
        setIsThisYear(false);
      } else {
        await insertChart(exerciseId, "thisYear");
        setIsThisYear(true);
      }
    } else if (type == "yearly") {
      const isInCharts = await isExerciseInCharts(exerciseId, type);
      if (isInCharts) {
        await deleteChart(exerciseId, type);
        setIsYearly(false);
      } else {
        await insertChart(exerciseId, "yearly");
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
            <View>
              <TouchableOpacity
                onPress={async () => {
                  handleClick("thisMonth");
                }}
                className="bg-slate-400 flex-row w-14 absolute top-[40] right-8 h-8 items-center justify-center rounded z-10"
              >
                {isThisMonth ? (
                  <Text className="text-white">-</Text>
                ) : (
                  <>
                    <Text className="text-white">+</Text>
                    <Feather size={12} name="home" color="white" />
                  </>
                )}
              </TouchableOpacity>
              <Charts exercise={exercise} type={"thisMonth"} />
            </View>
            <View>
              <TouchableOpacity
                onPress={async () => {
                  handleClick("thisYear");
                }}
                className="bg-slate-400 flex-row w-14 absolute top-[40] right-8 h-8 items-center justify-center rounded z-10"
              >
                {isThisYear ? (
                  <Text className="text-white">-</Text>
                ) : (
                  <>
                    <Text className="text-white">+</Text>
                    <Feather size={12} name="home" color="white" />
                  </>
                )}
              </TouchableOpacity>
              <Charts exercise={exercise} type={"thisYear"} />
            </View>
            <View>
              <TouchableOpacity
                onPress={async () => {
                  handleClick("yearly");
                }}
                className="bg-slate-400 flex-row w-14 absolute top-[40] right-8 h-8 items-center justify-center rounded z-10"
              >
                {isYearly ? (
                  <Text className="text-white">-</Text>
                ) : (
                  <>
                    <Text className="text-white">+</Text>
                    <Feather size={12} name="home" color="white" />
                  </>
                )}
              </TouchableOpacity>
              <Charts exercise={exercise} type={"yearly"} />
            </View>
          </>
        ) : (
          <History exercise={exercise} />
        )}
      </View>
    </ScrollView>
  );
}

export default Content;
