import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { DatabaseContext } from "../../../../../../context/DataContext";
import ExcerciseItem from "./ExcerciseItem";

function Excercises({ planId }) {
  const [excercises, setExcercises] = useState([]);
  const { getPlanExcercise, deletePlanExcercise } = useContext(DatabaseContext);
  async function deleteExcercise(id) {
    await deletePlanExcercise(id);
    setExcercises(excercises.filter((excercise) => excercise.id != id));
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
          <ExcerciseItem excercise={item} deleteExcercise={deleteExcercise} />
        )}
      />
    </View>
  );
}

export default Excercises;
