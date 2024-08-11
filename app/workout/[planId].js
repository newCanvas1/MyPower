import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WorkoutContext } from "../../context/WorkoutContext";
import WorkoutExercise from "../../src/Components/Workout/WorkoutExercise";
import WorkoutTimeCounter from "../../src/Components/Workout/WorkoutTimeCounter";
import { langChoice } from "../../src/utility/functions/langChoice";
import { LanguageContext } from "../../context/LanguageContext";
import { ARABIC, ENGLISH } from "../../src/utility/labels";
import { useRouter } from "expo-router";
import { ThemeContext } from "../../context/ThemeContext";
import { DatabaseContext } from "../../context/DataContext";
import CustomPopover from "../../src/Components/General/CustomPopover";
import Warning from "../../src/Components/Workout/Warning";
import ExercisesAddList from "../../src/Components/Homescreen/Plans/components/Excercise/ExercisesAddList.js";
import OverlayCounter from "../../src/Components/Workout/OverlayCounter/OverlayCounter.js";
import RestTime from "../../src/Components/Workout/OverlayCounter/RestTime.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
function workout(props) {
  const {
    exercises,
    plan,
    save,
    timePassed,
    setTimePassed,
    cancel,
    userHasCheckedSets,
    setShowAfterWorkout,
  } = useContext(WorkoutContext);
  const { theme } = useContext(ThemeContext);
  const [stopTimer, setStopTimer] = useState(false);
  const { language } = useContext(LanguageContext);
  const { getAllWorkouts, setWorkouts, setRefreshHistory } =
    useContext(DatabaseContext);
  const { addExercise, showOverlay, setShowOverlay, showRestTime } =
    useContext(WorkoutContext);
  const [showWarning, setShowWarning] = useState(false);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [type, setType] = useState("");
  const router = useRouter();
  function warning() {
    if (type == "noSets") {
      setShowWarning(true);
    } else {
      setShowWarning(true);
    }
  }
  function add(exercise) {
    addExercise(exercise);
  }

  async function finishClicked() {
    if (!userHasCheckedSets()) {
      setType("noSets");
      warning();
      return;
    }
    setStopTimer(!stopTimer);
    const saved = await save(timePassed);
    if (saved) {
      getAllWorkouts().then((data) => {
        setWorkouts(data);
      });
      setRefreshHistory(true);
      router.back();
      setTimeout(() => {
        setShowAfterWorkout(true);
      }, 300);
    }
  }
  return (
    <View
      className={
        "flex-col h-[100%] w-[100%] p-5 justify-center items-center " +
        theme.workoutScreen
      }
    >
      <View className="h-1 w-10 mb-10 bg-slate-500 rounded"></View>
      <View className="flex-row justify-between w-[100%]  items-center">
        <View className=" flex-col w-full">
          <View className="flex-row  ">
            <Text className={"text-2xl self-start " + theme.textPrimary}>
              {plan.name}
            </Text>
          </View>

          <View className="flex-row justify-between w-[100%] items-center">
            <WorkoutTimeCounter
              stopTimer={stopTimer}
              timePassed={timePassed}
              setTimePassed={setTimePassed}
            />
            <TouchableOpacity
              onPress={finishClicked}
              className="self-end justify-center bg-green-400 w-16 h-10 text-white items-center p-1 rounded"
            >
              <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
                {langChoice(language, ENGLISH.FINISH, ARABIC.FINISH)}
              </Text>
            </TouchableOpacity>
          </View>
          {showRestTime && (
            <View className="justify-center items-start  w-28">
              <Text
                className="text-white text-xs  self-center"
                style={{ fontFamily: "en" }}
              >
                {langChoice(language, ENGLISH.REST_TIME, ARABIC.REST_TIME)}
              </Text>
              <RestTime />
            </View>
          )}
        </View>
      </View>
      <FlatList
        className="mt-10 w-full mb-10 "
        data={exercises}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => <WorkoutExercise exercise={item} />}
        keyExtractor={(item) => item.exerciseId}
        ListFooterComponent={
          <TouchableOpacity
            className={` self-center mt-4 justify-center  w-[60%] h-10  items-center p-1 rounded border border-sky-300 shadow`}
            onPress={() => setShowAddExercise(true)}
          >
            <Text
              className={theme.textPrimary}
              style={{ fontFamily: langChoice(language, "en", "ar") }}
            >
              {langChoice(language, ENGLISH.ADD_EXERCISE, ARABIC.ADD_EXCERCISE)}
            </Text>
          </TouchableOpacity>
        }
      />

      <TouchableOpacity
        onPress={() => {
          if (!userHasCheckedSets()) {
            cancel();
            router.back();
            return;
          }
          setType("cancel");
          warning();
        }}
        className="mt-3 justify-center bg-red-400 w-[60%] h-10  items-center p-1 rounded"
      >
        <Text style={{ fontFamily: langChoice(language, "en", "ar") }}>
          {langChoice(language, ENGLISH.CANCEL, ARABIC.CANCEL)}
        </Text>
      </TouchableOpacity>
      <CustomPopover
        showPopover={showWarning}
        setShowPopover={setShowWarning}
        popOverheight={0.5}
        popOverwidth={0.8}
        content={<Warning type={type} setShowWarning={setShowWarning} />}
      />
      <CustomPopover
        showPopover={showAddExercise}
        setShowPopover={setShowAddExercise}
        popOverheight={0.8}
        popOverwidth={0.9}
        content={
          <View className="p-4">
            <ExercisesAddList add={add} />
          </View>
        }
      />
      <OverlayCounter
        isVisible={showOverlay}
        onClose={() => {
          setShowOverlay(false);
        }}
      />
    </View>
  );
}

export default workout;
