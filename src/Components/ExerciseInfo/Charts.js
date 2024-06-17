import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getExerciseChartInfo } from "../../../database/database";
import { LanguageContext } from "../../../context/LanguageContext";
import { ThemeContext } from "../../../context/ThemeContext";
import { ARABIC, ENGLISH } from "../../utility/labels";

import { langChoice } from "../../utility/functions/langChoice";
import {
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryLine,
  VictoryLabel,
} from "victory-native";

function Charts({ exercise }) {
  const [result, setResult] = useState([]);
  const [maxWeight, setMaxWeight] = useState(0);
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const [noData, setNoData] = useState(false);
  useEffect(() => {
    async function getInfo() {
      const categorizedSets = await getExerciseChartInfo(exercise.exerciseId);
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

  const getTickValues = () => {
    const currentDate = new Date();
    const previousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    return [previousMonth, currentDate, nextMonth].map((date) =>
      date.getTime()
    );
  };

  return (
    <View>
      {!noData ? (
        <VictoryChart>
          <VictoryAxis
            style={{
              axis: { stroke: "#756f6a" }, // Color of the axis line
              ticks: { stroke: "#756f6a" }, // Color of the tick marks
              tickLabels: { fill: "#756f6a" }, // Color of the tick labels
            }}
            tickValues={getTickValues()}
            tickFormat={(t) =>
              new Date(t).toLocaleDateString("en-US", {
                month: "short",
              })
            } // Format the date on the x-axis
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
        >
          {langChoice(
            language,
            ENGLISH.NO_REGISTERED_SETS,
            ARABIC.NO_REGISTERED_SETS
          )}
        </Text>
      )}
    </View>
  );
}

export default Charts;
