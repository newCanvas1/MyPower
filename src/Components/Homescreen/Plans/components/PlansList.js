import React, { useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { getTable } from "../../../../../database/database";
import { useState, useEffect } from "react";
import { DatabaseContext } from "../../../../../context/DataContext";
function PlansList(props) {
  const { plans } = useContext(DatabaseContext);
  useEffect(() => {
    console.log("plans", plans);
  }, [plans]);
  return (
    <View>
      {plans.length > 0 ? (
        <FlatList
          data={plans}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.icon}</Text>
              <Text>{item.description}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No plans found</Text>
      )}
    </View>
  );
}

export default PlansList;
