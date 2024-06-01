import React from "react";
import { View, Text, FlatList } from "react-native";
import { getTable } from "../../../../../database/database";
import { useState, useEffect } from "react";
function PlansList(props) {
    console.log(" PlansList");
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    getTable("plans").then((data) => {
      setPlans(data);
    });
  }, []);
  return (
    <View>
      {plans.length > 0 ? (
        <FlatList
          data={plans}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.icon}</Text>
              <Text>{item.description}</Text>
              <Text>{item.notes}</Text>
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
