import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Set from "./Set";
import AnimatedView from "../../General/AnimatedView";
function SetList({
  exerciseId,
  setsToUpdate,
  setSetsToUpdate,
  setSetsToDelete,
}) {
  return (
    <FlatList
      className=" w-full "
      data={setsToUpdate[exerciseId]}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({ item, index }) => (
        <AnimatedView
          duration={400}
          
          fadeIn
          content={
            <Set
              set={item}
              count={index + 1}
              setSetsToUpdate={setSetsToUpdate}
              setsToUpdate={setsToUpdate}
              setSetsToDelete={setSetsToDelete}
            />
          }
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

export default SetList;
