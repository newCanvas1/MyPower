import React, { useContext, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { ARABIC, ENGLISH } from "../../utility/labels";
import { langChoice } from "../../utility/functions/langChoice";
import { LanguageContext } from "../../../context/LanguageContext";
import { WorkoutContext } from "../../../context/WorkoutContext";
function Set({ set, count }) {
  const [reps, setReps] = useState(set.reps);
  const [weight, setWeight] = useState(set.weight);
  const [setOrder, setSetOrder] = useState(count);
  const { language } = useContext(LanguageContext);
  const { setSets } = useContext(WorkoutContext);

  return (
    <View className=" p-1 shadow w-[100%] flex-row justify-between items-center ">
      <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
        {setOrder}
      </Text>
      {weight == 0 || reps == 0 ? (
        <View className="bg-slate-500 roun w-[15%] h-1"></View>
      ) : (
        <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
          {`${weight} kg x ${reps}`}
        </Text>
      )}

      <TextInput
        style={{ fontFamily: langChoice(language, "en", "ar") }}
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
        className=" rounded p-1 w-10 text-center bg-white shadow"
      />
      <TextInput
        style={{ fontFamily: langChoice(language, "en", "ar") }}
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
        className=" rounded p-1 w-12 text-center bg-white shadow"
      />
    </View>
  );
}

export default Set;
