import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { DatabaseContext } from "../../../../../../context/DataContext";
import ExcerciseItem from "./ExcerciseItem";
import ExerciseItem from "../../../../CreatePlanScreen/ExerciseItem";
import { LanguageContext } from "../../../../../../context/LanguageContext";
import { langChoice } from "../../../../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../../../../utility/labels";
import { styles } from "../../../../../styles/styles";
import ExercisesAddList from "./ExercisesAddList";
import { ThemeContext } from "../../../../../../context/ThemeContext";

function Excercises({ planId, name }) {
  const [excercises, setExcercises] = useState([]);
  const [showAddExcercise, setShowAddExcercise] = useState(false);
  const { getPlanExcercise, deletePlanExcercise, addExerciseToPlan } =
    useContext(DatabaseContext);
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  async function deleteExcercise(item) {
    await deletePlanExcercise(item.id);
    setExcercises(excercises.filter((excercise) => excercise.id != item.id));
  }
  async function add(exercise) {
    await addExerciseToPlan(planId, exercise.exerciseId);
  }
  useEffect(() => {
    async function getExcercises() {
      const data = await getPlanExcercise(planId);
      setExcercises(data);
    }
    getExcercises();
  }, [showAddExcercise]);
  return (
    <View className="p-3 ">
      {!showAddExcercise && (
        <View>
          <Text
            style={{ fontFamily: langChoice(language, "en", "ar") }}
            className={"font-bold text-center text-2xl " + theme.textPrimary}
          >
            {name}
          </Text>
          <Text
            style={{ fontFamily: langChoice(language, "en", "ar") }}
            className={`font-bold text-${langChoice(
              language,
              "left",
              "right"
            )} text-xl ${theme.textPrimary}`}
          >
            {langChoice(language, ENGLISH.EXCERCISES, ARABIC.EXCERCISES)}
          </Text>
          <View className="mt-5">
            <FlatList
              data={excercises}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ExerciseItem item={item} deleteItem={deleteExcercise} />
              )}
            />
          </View>
        </View>
      )}
      <TouchableOpacity
        className={
          styles.addBtn +
          "justify-center items-center w-24  mt-5 self-center " +
          theme.workoutCard
        }
        onPress={() => {
          if (!showAddExcercise) return setShowAddExcercise(true);
          return setShowAddExcercise(false);
        }}
      >
        <Text
          className={"text-xl p-1 " + theme.textPrimary}
          style={{ fontFamily: langChoice(language, "en", "ar") }}
        >
          {showAddExcercise
            ? langChoice(language, ENGLISH.BACK, ARABIC.BACK)
            : "+"}
        </Text>
      </TouchableOpacity>
      {showAddExcercise && <ExercisesAddList add={add} />}
    </View>
  );
}

export default Excercises;
