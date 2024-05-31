import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function Layout() {
  return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Optionally configure static options outside the route.*/}
      </Stack>
  );
}
