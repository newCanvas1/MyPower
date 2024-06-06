import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { DatabaseContext } from "../../../../../../context/DataContext";
import ExcerciseItem from "./ExcerciseItem";
import ExerciseItem from "../../../../CreatePlanScreen/ExerciseItem";

function Excercises({ planId }) {
  const [excercises, setExcercises] = useState([]);
  const { getPlanExcercise, deletePlanExcercise } = useContext(DatabaseContext);
  async function deleteExcercise(item) {
    console.log(item);

    await deletePlanExcercise(item.id);
    setExcercises(
      excercises.filter((excercise) => excercise.id != item.id)
    );
  }
  useEffect(() => {
    async function getExcercises() {
      const data = await getPlanExcercise(planId);
      setExcercises(data);
    }
    getExcercises();
  }, []);
  return (
    <View>
      <FlatList
        data={excercises}
        renderItem={({ item }) => (
          <ExerciseItem item={item} deleteItem={deleteExcercise} />
        )}
      />
    </View>
  );
}

export default Excercises;
