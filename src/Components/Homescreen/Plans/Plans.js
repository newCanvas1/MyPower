import React from "react";
import { View, Text, FlatList } from "react-native";
import { getTable } from "../../../../database/database";
import { useState, useEffect } from "react";
import Title from "./components/Title";
import PlansList from "./components/PlansList";
function Plans() {
  const [plans, setPlans] = useState([]);
  console.log("plans");
  useEffect(() => {
    getTable("plans").then((data) => {
      setPlans(data);
    });
  }, []);
  return (
    <View className=" px-5">
      <Title />
      <PlansList />
    </View>
  );
}

export default Plans;
