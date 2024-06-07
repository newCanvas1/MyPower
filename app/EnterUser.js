import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import EnterUserInput from "../src/screens/EnterUserInput.js";

export default function EnterUser() {
  return (
    <SafeAreaView>
      <EnterUserInput />
    </SafeAreaView>
  );
}
