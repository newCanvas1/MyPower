import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import CreatePlanScreen from "../src/screens/CreatePlanScreen.js";
import { useRouter } from "expo-router";

export default function CreatePlan() {
  return (
    <SafeAreaView>
      <CreatePlanScreen />
    </SafeAreaView>
  );
}
