import { router, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getUserInfo, initDatabase } from "../database/database";
import Homescreen from "../src/screens/Homescreen.js";
import EnterUserInput from "../src/screens/EnterUserInput.js";
export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState("");
  useEffect(() => {
    async function getUser() {
      const user = await getUserInfo();
      setUser(1);
    }
    initDatabase();
    getUser();
  }, []);


  return (
    <SafeAreaView>{user ? <Homescreen /> : <EnterUserInput />}</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
