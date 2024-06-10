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
      <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
        50 kg x 10
      </Text>

      <TextInput
        style={{ fontFamily: langChoice(language, "en", "ar") }}
        placeholder={langChoice(language, ENGLISH.WEIGHT, ARABIC.WEIGHT)}
        value={weight}
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
        placeholder={langChoice(language, ENGLISH.REPS, ARABIC.REPS)}
        value={reps}
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
