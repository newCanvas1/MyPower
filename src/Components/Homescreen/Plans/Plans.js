import React from "react";
import { View, Text, FlatList } from "react-native";
import { getTable } from "../../../../database/database";
import { useState, useEffect } from "react";
import Title from "./components/Title";
import PlansList from "./components/PlansList";
function Plans(props) {
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    getTable("plans").then((data) => {
      setPlans(data);
    });
  }, []);
  return (
    <View className="mt-56 px-10">
      <Title />
      <PlansList />
    </View>
  );
}

export default Plans;
