import { router, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  checkIfUserExists,
  initDatabase,
} from "../database/database";
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
        setUser(true);
      } else {
        setUser(false);
      }
    }
    initDatabase();
    getUser();
  }, []);

  return (
    <SafeAreaView>
      {user
        ? router.replace("/(tabs)")
        : !isLoading && <EnterUserInput setUser={setUser} />}
    </SafeAreaView>
  );
}
