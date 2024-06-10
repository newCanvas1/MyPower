import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { DatabaseContext } from "../../context/DataContext";
import Workout from "../Components/History/Workout";

function History(props) {
  const { getAllWorkouts } = useContext(DatabaseContext);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    getAllWorkouts().then((data) => {
      setHistory(data);
      console.log("history", data.length);
    });
  }, []);
  return (
    <View className="p-3">
      <FlatList
        data={history}
        renderItem={({ item }) => <Workout item={item} />}
        className=" h-full"
        keyExtractor={(item) => item.workout.workoutId}
        ItemSeparatorComponent={() => <View style={{ height: 30 }}></View>}
      />
    </View>
  );
}

export default History;
