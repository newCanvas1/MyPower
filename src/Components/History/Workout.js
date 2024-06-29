import React, { useContext, useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import formateTime from "../../utility/functions/formatTime";
import { LanguageContext } from "../../../context/LanguageContext";
import { ThemeContext } from "../../../context/ThemeContext";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { ENGLISH, ARABIC } from "../../utility/labels";
import { langChoice } from "../../utility/functions/langChoice";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getBestSetOfExerciseOfWorkout } from "../../../database/database";
import formatDate from "../../utility/functions/formatDate";
import Tooltip from "../General/Tooltip/Tooltip";
import { DatabaseContext } from "../../../context/DataContext";
import CustomPopover from "../General/CustomPopover";
import EditWorkout from "./EditWorkout";
import Set from "./Set";
function Workout({ item }) {
  const [workout, setWorkout] = useState(item.workout);
  const [exercises, setExercises] = useState(item.exercises);
  const [plan, setPlan] = useState(item.plan);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef();
  const { theme } = useContext(ThemeContext);
  const { deleteWorkout } = useContext(DatabaseContext);
  const { language } = useContext(LanguageContext);
  const [showEdit, setShowEdit] = useState(false);
  return (
    <View className={"shadow w-full p-2 rounded-xl " + theme.workoutCard}>
      <View className="flex-row items-center justify-between p-4">
        <View>
          <Text
            className={"text-xl " + theme.textPrimary}
            style={{ fontFamily: langChoice(language, "en", "ar") }}
          >
            {plan?.name}
          </Text>
          <Text
            className={theme.textPrimary}
            style={{ fontFamily: langChoice(language, "en", "ar") }}
          >
            {formateTime(workout.duration)}
          </Text>
        </View>

        <View className="flex-col items-center">
          <TouchableOpacity
            ref={tooltipRef}
            className="bg-gray-400 p-1 rounded"
            onPress={() => setShowTooltip(true)}
          >
            <Icon name="options" size={15} color="black" />
          </TouchableOpacity>
          <Text
            className={theme.textPrimary}
            style={{ fontFamily: langChoice(language, "en", "ar") }}
          >
            {formatDate(workout.date)}
          </Text>
        </View>
      </View>
      <Tooltip
        setShowTooltip={setShowTooltip}
        showTooltip={showTooltip}
        tooltipRef={tooltipRef}
        buttons={[
          {
            func: () => deleteWorkout(workout.workoutId),
            label: langChoice(language, ENGLISH.DELETE, ARABIC.DELETE),
            color: "red",
            icon: (
              <MaterialCommunityIcons name={"delete"} size={15} color={"red"} />
            ),
          },
          {
            func: () => {
              setShowTooltip(false);
              setTimeout(() => {
                setShowEdit(true);
              }, 500);
            },
            label: langChoice(language, ENGLISH.EDIT, ARABIC.EDIT),
            color: "blue",
            icon: (
              <MaterialCommunityIcons
                name={"application-edit"}
                size={15}
                color={"green"}
              />
            ),
          },
        ]}
      />
      <View className="flex-row items-center px-10 justify-between mb-2">
        <Text
          className={theme.textPrimary}
          style={{ fontFamily: langChoice(language, "en", "ar") }}
        >
          {langChoice(language, ENGLISH.EXCERCISES, ARABIC.EXCERCISES)}
        </Text>
        <Text
          className={theme.textPrimary}
          style={{ fontFamily: langChoice(language, "en", "ar") }}
        >
          {langChoice(language, ENGLISH.BEST_SET, ARABIC.BEST_SET)}
        </Text>
      </View>

      <FlatList
        data={exercises}
        renderItem={({ item, index }) => (
          <Set
            key={index}
            exercise={item}
            index={index}
            workoutId={workout.workoutId}
          />
        )}
      />

      <CustomPopover
        showPopover={showEdit}
        setShowPopover={setShowEdit}
        content={<EditWorkout workout={workout} setWorkout={setWorkout} />}
        popOverheight={0.8}
        popOverwidth={0.9}
      />
    </View>
  );
}

export default Workout;
