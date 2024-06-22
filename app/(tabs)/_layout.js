import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { Tabs, router } from "expo-router";
import { useContext, useEffect } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { langChoice } from "../../src/utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../src/utility/labels";
import Octicons from "@expo/vector-icons/Octicons";
import {
  LogBox,
  SafeAreaView,
  Text,
  Touchable,
  TouchableOpacity,
} from "react-native";

import BottomWorkoutIndicator from "../../src/Components/General/BottomWorkoutIndicator";
import { ThemeContext } from "../../context/ThemeContext";
export default function TabLayout() {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested inside"]);
  }, []);

  return (
    <SafeAreaView
      className={theme.mainScreen}
      style={{ height: "100%", width: "100%" }}
    >
      <Tabs
        screenOptions={{
          // lazy: false,
          tabBarActiveTintColor: theme.tabBarSelected,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "transparent",
            borderTopWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: langChoice(language, ENGLISH.HOME, ARABIC.HOME),
            tabBarLabelStyle: {
              fontFamily: langChoice(language, "en", "ar"),
            },
            tabBarIcon: ({ color }) => (
              <Feather size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="exercises"
          options={{
            title: langChoice(language, ENGLISH.EXCERCISES, ARABIC.EXCERCISES),
            tabBarLabelStyle: {
              fontFamily: langChoice(language, "en", "ar"),
            },

            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                size={28}
                name="weight-lifter"
                color={color}
              />
            ),
            tabBarIconStyle: {
              marginBottom: 0,
            },
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: langChoice(language, ENGLISH.HISTORY, ARABIC.HISTORY),
            tabBarLabelStyle: {
              fontFamily: langChoice(language, "en", "ar"),
            },

            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons size={28} name="history" color={color} />
            ),
            tabBarIconStyle: {
              marginBottom: 0,
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: langChoice(language, ENGLISH.PROFILE, ARABIC.PROFILE),
            tabBarLabelStyle: {
              fontFamily: langChoice(language, "en", "ar"),
            },

            tabBarIcon: ({ color }) => (
              <Octicons size={28} name="person" color={color} />
            ),
            tabBarIconStyle: {
              marginBottom: 0,
            },
          }}
        />
      </Tabs>
      <BottomWorkoutIndicator />
    </SafeAreaView>
  );
}
