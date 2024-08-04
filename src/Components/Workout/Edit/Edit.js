import React, { useContext, useEffect, useState } from "react";
import {
  deleteExercisesAndSets,
  getWorkoutInfo,
  insertNewEditSets,
  updateEditedSets,
} from "../../../../database/database";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import WorkoutExercise from "../../Workout/Edit/WorkoutExercise";
import { langChoice } from "../../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../../utility/labels";
import { LanguageContext } from "../../../../context/LanguageContext";
import { DatabaseContext } from "../../../../context/DataContext";
function Edit({ workoutId }) {
  const { language } = useContext(LanguageContext);
  const [excercises, setExcercises] = useState([]);
  const { updateWorkouts } = useContext(DatabaseContext);

  // {exerciseId: {setId: set}}
  const [setsToUpdate, setSetsToUpdate] = useState({});
  // [setId]
  const [setsToDelete, setSetsToDelete] = useState([]);

  async function saveEdition() {
    // delete removed sets
    await deleteExercisesAndSets(exercisesToDelete, setsToDelete, workoutId);
    // insert new sets
    await insertNewEditSets(setsToUpdate, workoutId);
    // update sets
    await updateEditedSets(setsToUpdate);
  }
  const [exercisesToDelete, setExercisesToDelete] = useState([]);
  useEffect(() => {
    getWorkoutInfo(workoutId).then((data) => {
      setExcercises(data.exercises);
      // initial sets
      for (const exercise of data.exercises) {
        setSetsToUpdate((prev) => {
          const newPrev = { ...prev };
          newPrev[exercise.exerciseId] = [];
          return newPrev;
        });
      }
      for (const set of data.sets) {
        setSetsToUpdate((prev) => {
          const newPrev = { ...prev };
          newPrev[set.exerciseId].push(set);
          return newPrev;
        });
      }
    });
  }, []);


  return (
    <View className=" p-5 h-[500] justify-center items-center w-[100%]">
      <FlatList
        data={excercises}
        renderItem={({ item }) => (
          <WorkoutExercise
            saveEdition={saveEdition}
            setExercisesToDelete={setExercisesToDelete}
            setExercises={setExcercises}
            exercise={item}
            setsToUpdate={setsToUpdate}
            setSetsToUpdate={setSetsToUpdate}
            setSetsToDelete={setSetsToDelete}
          />
        )}
        keyExtractor={(item) => item.exerciseId}
      />
      <TouchableOpacity
        onPress={async () => {
          // save the editted workout
          await saveEdition();
          updateWorkouts();
        }}
        className="bg-green-400 rounded justify-center items-center mt-2 p-2 w-[250] h-10"
      >
        <Text style={{ fontFamily: "ar" }}>
          {langChoice(language, ENGLISH.SAVE, ARABIC.SAVE)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Edit;
