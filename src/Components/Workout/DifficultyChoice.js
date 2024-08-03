import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { WorkoutContext } from "../../../context/WorkoutContext";
import { langChoice } from "../../utility/functions/langChoice";
import { LanguageContext } from "../../../context/LanguageContext";
import { ARABIC, ENGLISH } from "../../utility/labels";
const DIFFICULTY = [
  {
    id: 1,
    name: "1",
  },
  {
    id: 2,
    name: "2",
  },
  {
    id: 3,
    name: "3",
  },
  {
    id: 4,
    name: "4",
  },
  {
    id: 5,
    name: "5",
  },
  {
    id: 6,
    name: "6",
  },
  {
    id: 7,
    name: "7",
  },
  {
    id: 8,
    name: "8",
  },
  {
    id: 9,
    name: "9",
  },
  {
    id: 10,
    name: "10",
  },
];
function DifficultyChoice({ difficulty, setDifficulty, id }) {
  const { setSets, sets } = useContext(WorkoutContext);
  const { language } = useContext(LanguageContext);
  const [setInfo, setSetInfo] = useState({});
  useEffect(() => {
    for (const exerciseId of Object.keys(sets)) {
      for (const set of sets[exerciseId]) {
        if (set.id == id) {
          setSetInfo({ weight: set.weight, reps: set.reps });
          break;
        }
      }
    }
  }, []);
  function difficultyChanged(newDifficulty) {
    setDifficulty(newDifficulty);
    setSets((prev) => {
      const newSets = { ...prev };
      // for every exercise in the sets object
      for (const exerciseId of Object.keys(newSets)) {
        // for every set in the exercise
        for (const set of newSets[exerciseId]) {
          // if the set is checked and the difficulty is not the same as the new difficulty
          if (set.id == id) {
            // set the difficulty to the new difficulty
            set.difficulty = newDifficulty;
            break;
          }
        }
      }
      return newSets;
    });
  }
  return (
    <View className="flex-col ">
      <View className="flex-row  flex-1  w-[100%] ">
        <Text
          style={{ fontFamily: "ar" }}
          className=" text-xs w-[80%] text-center  "
        >
          {langChoice(language, ENGLISH.DIFFICULTY, ARABIC.DIFFICULTY)}
        </Text>
        <Text
          style={{ fontFamily: "ar" }}
          className="text-xs flex-1 text-right opacity-60"
        >
          {`${setInfo.weight}kg x ${setInfo.reps}`}
        </Text>
      </View>

      <View className=" flex-row items-center justify-center flex-1 ">
        {DIFFICULTY.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => difficultyChanged(item.id)}
              key={index}
              className={`${
                item.id == difficulty ? "bg-emerald-100" : "bg-[#76ABAE]"
              } rounded p-1 px-2 m-1 justify-center items-center `}
            >
              <Text
                className={`${item.color} text-xs font-bold`}
                style={{ fontFamily: "ar" }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default DifficultyChoice;
