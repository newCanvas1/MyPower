import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { DatabaseProvider } from "../context/DataContext";
import FontContextProvider from "../context/FontContext";
import { LanguageContextProvider } from "../context/LanguageContext";
import { WorkoutContextProvider } from "../context/WorkoutContext";
import { ThemeContext, ThemeProvider } from "../context/ThemeContext";
import { useContext } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ProgressContextProvider } from "../context/ProgressContext";
import { SoundsProvider } from "../context/SoundsContext";

export default function Layout() {
  const StackElement = () => {
    const { theme } = useContext(ThemeContext);

    return (
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.screenColor },
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
        <Stack.Screen
          name="workouts/[day]"
          options={{ presentation: "modal" }}
        />
      </Stack>
    );
  };
  return (
    <GestureHandlerRootView>
      <SoundsProvider>
        <LanguageContextProvider>
          <FontContextProvider>
            <DatabaseProvider>
              <ProgressContextProvider>
                <WorkoutContextProvider>
                  <ThemeProvider>
                    <StackElement />
                  </ThemeProvider>
                </WorkoutContextProvider>
              </ProgressContextProvider>
            </DatabaseProvider>
          </FontContextProvider>
        </LanguageContextProvider>
      </SoundsProvider>
    </GestureHandlerRootView>
  );
}
