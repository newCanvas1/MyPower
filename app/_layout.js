import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { DatabaseProvider } from "../context/DataContext";

export default function Layout() {
  return (
    <DatabaseProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Optionally configure static options outside the route.*/}
      </Stack>
    </DatabaseProvider>
  );
}
