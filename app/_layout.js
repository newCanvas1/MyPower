import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { DatabaseProvider } from "../context/DataContext";
import FontContextProvider from "../context/FontContext";

export default function Layout() {
  return (
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
  );
}
