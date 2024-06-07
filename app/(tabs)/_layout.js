import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { langChoice } from "../../src/utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../src/utility/labels";
export default function TabLayout() {
  const { language } = useContext(LanguageContext);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "green",
        headerShown: false,
        tabBarStyle: {
          height: 100,
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
        name="settings"
        options={{
          title: langChoice(language, ENGLISH.SETTINGS, ARABIC.SETTINGS),
          tabBarLabelStyle: {
            fontFamily: langChoice(language, "en", "ar"),
          },

          tabBarIcon: ({ color }) => (
            <Feather size={28} name="settings" color={color} />
          ),
          tabBarIconStyle: {
            marginBottom: 0,
          },
        }}
      />
    </Tabs>
  );
}
