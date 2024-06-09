import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { DatabaseProvider } from "../context/DataContext";
import FontContextProvider from "../context/FontContext";
import { LanguageContextProvider } from "../context/LanguageContext";

export default function Layout() {
  return (
    <LanguageContextProvider>
      <FontContextProvider>
        <DatabaseProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="exercise/info/[exerciseId]" options={{ presentation: "modal" }} />

          </Stack>
        </DatabaseProvider>
      </FontContextProvider>
    </LanguageContextProvider>
  );
}
