import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { langChoice } from "../../utility/functions/langChoice";
import { LanguageContext } from "../../../context/LanguageContext";
import { WorkoutContext } from "../../../context/WorkoutContext";
import { router } from "expo-router";
import { ThemeContext } from "../../../context/ThemeContext";
import { ARABIC, ENGLISH } from "../../utility/labels";

function Warning({ type, setShowWarning }) {
  const { language } = useContext(LanguageContext);
  const { cancel } = useContext(WorkoutContext);
  const { theme } = useContext(ThemeContext);
  const FinishWarning = () => {
    return (
      <View className="flex flex-col h-[100%] w-[100%] justify-center items-center">
        <Text
          className={`${theme.textPrimary} mb-10 text-xl`}
          style={{ fontFamily: langChoice(language, "en", "ar") }}
        >
          {langChoice(
            language,
            ENGLISH.NO_SETS_CONFIRMED,
            ARABIC.NO_SETS_CONFIRMED
          )}
        </Text>
        <View className="w-[60%]">
          <TouchableOpacity
            className="w-[100%] h-10 bg-green-400 text-white items-center  justify-center rounded shadow"
            onPress={() => setShowWarning(false)}
          >
            <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
              {langChoice(language, ENGLISH.RESUME, ARABIC.RESUME)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className=" w-[100%] bg-red-400 h-10 items-center justify-center shadow rounded mt-5"
            onPress={() => {
              cancel();
              setShowWarning(false);
              router.back();
            }}
          >
            <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
              {langChoice(
                language,
                ENGLISH.CANCEL_WORKOUT,
                ARABIC.CANCEL_WORKOUT
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const CancelWarning = () => {
    return (
      <View className="flex flex-col h-[100%] w-[100%] justify-center items-center">
        <Text
          className={`${theme.textPrimary} mb-10 text-xl`}
          style={{ fontFamily: langChoice(language, "en", "ar") }}
        >
          {langChoice(language, ENGLISH.CANCEL_CONFIRM, ARABIC.CANCEL_CONFIRM)}
        </Text>
        <View className="w-[60%]">
          <TouchableOpacity
            className="w-[100%] h-10 bg-green-400 text-white items-center  justify-center rounded shadow"
            onPress={() => setShowWarning(false)}
          >
            <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
              {langChoice(language, ENGLISH.RESUME, ARABIC.RESUME)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className=" w-[100%] bg-red-400 h-10 items-center justify-center shadow rounded mt-5"
            onPress={() => {
              cancel();
              setShowWarning(false);
              router.back();
            }}
          >
            <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
              {langChoice(
                language,
                ENGLISH.CANCEL_WORKOUT,
                ARABIC.CANCEL_WORKOUT
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return <View>{type == "noSets" ? FinishWarning() : CancelWarning()}</View>;
}

export default Warning;
