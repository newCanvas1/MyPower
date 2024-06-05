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
            {/* Optionally configure static options outside the route.*/}
          </Stack>
        </DatabaseProvider>
      </FontContextProvider>
    </LanguageContextProvider>
  );
}
