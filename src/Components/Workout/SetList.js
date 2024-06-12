import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { WorkoutContext } from "../../../context/WorkoutContext";
import Set from "./Set";

function SetList({ exerciseId }) {
  const { sets } = useContext(WorkoutContext);

  return (
    <FlatList
      className=" w-full "
      data={sets[exerciseId]}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({ item, index }) => <Set set={item} count={index + 1} />}
      keyExtractor={(item) => item.id}
    />
  );
}

export default SetList;
