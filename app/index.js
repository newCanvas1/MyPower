import { router, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { checkIfUserExists, initDatabase } from "../database/database";
import EnterUserInput from "../src/screens/EnterUserInput.js";
export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getUser() {
      const isUserExists = await checkIfUserExists();
      setIsLoading(false);
      if (isUserExists) {
        router.replace("/(tabs)");
      } else {
        router.replace("/EnterUser");
      }
    }
    initDatabase();
    getUser();
  }, []);

  return <SafeAreaView></SafeAreaView>;
}
