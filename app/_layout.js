import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { DatabaseProvider } from "../context/DataContext";
import FontContextProvider from "../context/FontContext";
import { LanguageContextProvider } from "../context/LanguageContext";
import { WorkoutContextProvider } from "../context/WorkoutContext";

export default function Layout() {
  return (
    <LanguageContextProvider>
      <FontContextProvider>
        <DatabaseProvider>
          <WorkoutContextProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name="exercise/info/[exerciseId]"
                options={{ presentation: "modal" }}
              />
              <Stack.Screen
                name="workout/[planId]"
                options={{ presentation: "modal" }}
              />
            </Stack>
          </WorkoutContextProvider>
        </DatabaseProvider>
      </FontContextProvider>
    </LanguageContextProvider>
  );
}
