import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { WorkoutContext } from "../../../context/WorkoutContext";
import Set from "./Set";
import AnimatedView from "../General/AnimatedView";
function SetList({ exerciseId }) {
  const { sets } = useContext(WorkoutContext);

  return (
    <FlatList
      className=" w-full "
      data={sets[exerciseId]}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({ item, index }) => (
        <AnimatedView
          duration={400}
          enterFromLeft
          fadeIn
          content={<Set set={item} count={index + 1} />}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

export default SetList;
