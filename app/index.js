import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { checkIfUserExists, initDatabase } from "../database/database";
import { LogBox } from "react-native";

export default function Page() {
  useEffect(() => {
    LogBox.ignoreLogs([
      "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality",
    ]);
    const originalConsoleError = console.error;
// remove default props error message
console.error = (message, ...args) => {
    if (typeof message === 'string' && message.includes('VirtualizedLists should never be nested')) {
        return;
    }
    originalConsoleError.apply(console, [message, ...args])
}
  }, []);
  const router = useRouter();
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
