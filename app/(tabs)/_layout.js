import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { Tabs, router } from "expo-router";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { langChoice } from "../../src/utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../src/utility/labels";
import Octicons from "@expo/vector-icons/Octicons";
import { SafeAreaView, Text, Touchable, TouchableOpacity } from "react-native";
import { WorkoutContext } from "../../context/WorkoutContext";
import formatTime from "../../src/utility/functions/formatTime";
export default function TabLayout() {
  const { language } = useContext(LanguageContext);
  const { activeWorkout, timePassed,planId } = useContext(WorkoutContext);
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "green",
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
      {activeWorkout && (
        <TouchableOpacity onPress={()=>{
          router.push(`workout/${planId}`);
        }} className=" rounded border-t-2 bg-green-300 p-1 shadow w-[90%] self-center flex-row justify-between items-center h-20 ">
          <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
            Back Day {formatTime(timePassed)}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
