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
  getUserInfo,
  initDatabase,
} from "../database/database";
import Homescreen from "../src/screens/Homescreen.js";
import EnterUserInput from "../src/screens/EnterUserInput.js";
export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState("");
  useEffect(() => {
    async function getUser() {
      const isUserExists = await checkIfUserExists();
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
    <SafeAreaView>{user ? <Homescreen /> : <EnterUserInput setUser={setUser} />}</SafeAreaView>
  );
}
