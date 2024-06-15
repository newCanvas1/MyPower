import React, { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { ARABIC, ENGLISH } from "../../utility/labels";
import { langChoice } from "../../utility/functions/langChoice";
import { LanguageContext } from "../../../context/LanguageContext";
import { WorkoutContext } from "../../../context/WorkoutContext";
import { ThemeContext } from "../../../context/ThemeContext";
import Feather from "@expo/vector-icons/Feather";
function Set({ set, count }) {
  const [reps, setReps] = useState(set.reps);
  const [weight, setWeight] = useState(set.weight);
  const [setOrder, setSetOrder] = useState(count);
  const { language } = useContext(LanguageContext);
  const { setSets } = useContext(WorkoutContext);
  const { theme } = useContext(ThemeContext);

  return (
    <View className=" p-1 shadow w-[100%] flex-row justify-between items-center ">
      <Text
        className={theme.textPrimary}
        style={{ fontFamily: langChoice(language, "en", "ar") }}
      >
        {setOrder}
      </Text>
      <View className="w-20 items-center ">
        {weight == 0 || reps == 0 ? (
          <View className="bg-slate-500  w-[50%] h-1"></View>
        ) : (
          <Text
            className={theme.textPrimary}
            style={{ fontFamily: langChoice(language, "en", "ar") }}
          >
            {`${weight} kg x ${reps}`}
          </Text>
        )}
      </View>

      <TextInput
      keyboardType="numeric"

        style={{ fontFamily: langChoice(language, "en", "ar") }}
        placeholderTextColor={theme.setPlaceholder}
        placeholder={
          weight == 0
            ? langChoice(language, ENGLISH.WEIGHT, ARABIC.WEIGHT)
            : weight.toString()
        }
        onChangeText={(text) => {
          setSets((prev) => {
            const newSets = { ...prev };
            const listofSets = newSets[set.exerciseId];
            for (let i = 0; i < listofSets.length; i++) {
              if (listofSets[i].id === set.id) {
                listofSets[i].weight = text;
                break;
              }
            }
            newSets[set.exerciseId] = listofSets;
            return newSets;
          });
        }}
        className={
         theme.set+ 
          theme.setInputBorder +
          " " +
          theme.inputValue
        }
      />
      <TextInput
      keyboardType="numeric"
        style={{ fontFamily: langChoice(language, "en", "ar") }}
        placeholderTextColor={theme.setPlaceholder}
        placeholder={
          reps == 0
            ? langChoice(language, ENGLISH.REPS, ARABIC.REPS)
            : reps.toString()
        }
        onChangeText={(text) => {
          setSets((prev) => {
            const newSets = { ...prev };
            const listofSets = newSets[set.exerciseId];
            for (let i = 0; i < listofSets.length; i++) {
              if (listofSets[i].id === set.id) {
                listofSets[i].reps = text;
                break;
              }
            }
            newSets[set.exerciseId] = listofSets;
            return newSets;
          });
        }}
        className={
          theme.set+
          theme.setInputBorder +
          " " +
          theme.inputValue
        }
      />
      <TouchableOpacity
        onPress={() => {
          setSets((prev) => {
            const newSets = { ...prev };
            const listofSets = newSets[set.exerciseId];
            for (let i = 0; i < listofSets.length; i++) {
              if (listofSets[i].id === set.id) {
                listofSets[i].checked = !listofSets[i].checked;
                break;
              }
            }
            newSets[set.exerciseId] = listofSets;
            return newSets;
          });
        }}
        className={`${
          set.checked ? "bg-green-400" : " "
        } rounded border shadow p-[1px]`}
      >
        <Feather name="check" size={20} color={theme.color} />
      </TouchableOpacity>
    </View>
  );
}

export default Set;
