import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../../../context/ThemeContext";
import formatDate from "../../utility/functions/formatDate";
import { LanguageContext } from "../../../context/LanguageContext";
import { langChoice } from "../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../utility/labels";
function WorkoutItem({ workout, exercise, deleteRecord }) {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  return (
    <View className="w-[100%] border border-white p-2 rounded-xl mt-4">
      <View key={workout.workout.workoutId}>
        <View className="flex-row justify-between">
          <Text
            style={{ fontFamily: "ar" }}
            className={"text-xl " + theme.textPrimary}
          >
            {workout.plan?.name}
          </Text>
          <Text style={{ fontFamily: "ar" }} className={theme.textPrimary}>
            {formatDate(workout.workout.date)}
          </Text>
          <TouchableOpacity
            onPress={() => {
              deleteRecord(exercise.exerciseId, workout.workout.workoutId);
            }}
            className="  p-1 border  rounded bg-red-600 "
          >
            <Text
              style={{
                fontFamily: langChoice(language, "en", "ar"),
              }}
              className={"  " + theme.textPrimary}
            >
              {langChoice(language, ENGLISH.DELETE, ARABIC.DELETE)}
            </Text>
          </TouchableOpacity>
        </View>
        {workout.exercises.map((e) => {
          return (
            <View key={e.exerciseId} className=" px-5">
              {e.exerciseId == exercise.exerciseId ? (
                <View>
                  <Text
                    style={{ fontFamily: "ar" }}
                    className={theme.textPrimary}
                  >
                    {e.name}
                  </Text>
                  <View className="flex-row justify-between mt-2">
                    <Text
                      style={{ fontFamily: "ar" }}
                      className={theme.textPrimary}
                    >
                      {langChoice(language, ENGLISH.SET, ARABIC.SET)}
                    </Text>
                    <Text
                      style={{ fontFamily: "ar" }}
                      className={theme.textPrimary}
                    >
                      {langChoice(language, ENGLISH.WEIGHT, ARABIC.WEIGHT)}
                    </Text>
                    <Text
                      style={{ fontFamily: "ar" }}
                      className={theme.textPrimary}
                    >
                      {langChoice(language, ENGLISH.REPS, ARABIC.REPS)}
                    </Text>
                  </View>
                  {workout.sets[e.exerciseId]?.map((set, index) => {
                    return (
                      <View
                        key={set.id}
                        className="flex-row justify-between mt-2"
                      >
                        <Text className={theme.textPrimary}>{index + 1}</Text>
                        <Text className={theme.textPrimary}>
                          {set.weight} kg
                        </Text>
                        <Text className={theme.textPrimary}>{set.reps}</Text>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <></>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default WorkoutItem;
