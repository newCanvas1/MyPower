import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getExerciseChartOfPeriod } from "../../../database/database";
import { LanguageContext } from "../../../context/LanguageContext";
import { ThemeContext } from "../../../context/ThemeContext";

import { langChoice } from "../../utility/functions/langChoice";
import {
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryLine,
  VictoryLabel,
} from "victory-native";
import { DatabaseContext } from "../../../context/DataContext";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { ARABIC, ENGLISH } from "../../utility/labels";

function Charts({ exercise, type, homescreen }) {
  const [result, setResult] = useState([]);
  const [maxWeight, setMaxWeight] = useState(0);
  const { language } = useContext(LanguageContext);
  const { exercises } = useContext(DatabaseContext);
  const { theme } = useContext(ThemeContext);
  const [exerciseName, setExerciseName] = useState("");
  const [noData, setNoData] = useState(false);
  const GetTimeLabel = () => {
    const label =
      type == "thisMonth"
        ? langChoice(language, ENGLISH.THIS_MONTH, ARABIC.THIS_MONTH)
        : type == "thisYear"
        ? langChoice(language, ENGLISH.THIS_YEAR, ARABIC.THIS_YEAR)
        : langChoice(language, ENGLISH.ALL_TIME, ARABIC.ALL_TIME);
    return label;
  };
  useEffect(() => {
    async function getInfo() {
      for (const e of exercises) {
        if (exercise.exerciseId == e.exerciseId) {
          setExerciseName(e.name);
        }
      }

      const categorizedSets = await getExerciseChartOfPeriod(
        exercise.exerciseId,
        type
      );
      if (categorizedSets.length == 0) {
        setNoData(true);
      } else {
        setNoData(false);
      }
      setMaxWeight(categorizedSets[categorizedSets.length - 1]?.y);
      setResult(categorizedSets);
    }
    getInfo();
  }, []);
  return (
    <View className="items-center justify-center">
      {homescreen && (
        <Text
          style={{ fontFamily: langChoice(language, "en", "ar") }}
          className="text-white text-center   top-[20]"
        >
          {exerciseName}
        </Text>
      )}

      <Text
        style={{ fontFamily: langChoice(language, "en", "ar") }}
        className={`text-white text-center  top-[20] ${
          homescreen ? " opacity-25" : ""
        }`}
      >
        {GetTimeLabel()}
      </Text>

      {!noData ? (
        <VictoryChart>
          <VictoryAxis
            style={{
              axis: { stroke: "#756f6a" }, // Color of the axis line
              ticks: { stroke: "#756f6a" }, // Color of the tick marks
              tickLabels: { fill: "#756f6a" }, // Color of the tick labels
            }}
          />
          <VictoryAxis
            style={{
              axis: { stroke: "#756f6a" }, // Color of the axis line
              ticks: { stroke: "#756f6a" }, // Color of the tick marks
              tickLabels: { fill: "#756f6a" }, // Color of the tick labels
            }}
            domain={[0, maxWeight + 20]} // Set the y-axis domain
            dependentAxis
            tickFormat={(t) => `${t} kg`} // Format the weight on the y-axis
          />
          <VictoryLine data={result} style={{ data: { stroke: "gray" } }} />
          <VictoryScatter
            data={result}
            size={5}
            labels={({ datum }) => `${datum.y} kg`}
            labelComponent={
              <VictoryLabel
                style={{ fill: "#fff" }} // Change the text color here
                textAnchor={"end"} // Align the text to the end of the label
                dx={15} // Move the text up a bit
              />
            }
            style={{ data: { fill: "gray" } }}
          />
        </VictoryChart>
      ) : (
        <Text
          className={`text-${theme.color} text-center`}
          style={{ fontSize: 20, fontFamily: langChoice(language, "en", "ar") }}
        ></Text>
      )}
    </View>
  );
}

export default Charts;
