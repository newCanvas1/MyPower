import React, { useContext, useEffect, useState } from "react";
import { getWorkoutDates } from "../../../../database/database";
import { Calendar } from "react-native-calendars";
import { WorkoutContext } from "../../../../context/WorkoutContext";
import { DatabaseContext } from "../../../../context/DataContext";
import { langChoice } from "../../../utility/functions/langChoice";
import { LanguageContext } from "../../../../context/LanguageContext";
import CustomPopover from "../../General/CustomPopover";
import { Text, View } from "react-native";
import DayPopover from "./DayPopover";
function WorkoutsCalender() {
  const [dates, setDates] = useState({});
  const { updateWorkouts } = useContext(DatabaseContext);
  const { language } = useContext(LanguageContext);
  const [showWorkoutsPopover, setShowWorkoutsPopover] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  useEffect(() => {
    getWorkoutDates().then((data) => {
      setDates(data);
    });
  }, [updateWorkouts]);
  return (
    <View className="mt-5">
      <Calendar
        style={{ height: 100, width: 350, alignSelf: "center" }}
        theme={{
          calendarBackground: "transparent",
          textMonthFontFamily: langChoice(language, "en", "ar"),
          textDayFontFamily: langChoice(language, "en", "ar"),
          textDayHeaderFontFamily: langChoice(language, "en", "ar"),
          monthTextColor: "white",
          textMonthFontSize: 12,
          textDayFontSize: 12,
          textMonthFontSize: 12,
          textMonthFontColor: "white",
          textDayFontColor: "white",
          textDayFontWeight: "bold",
          textMonthFontWeight: "bold",
        }}
        headerStyle={{ backgroundColor: "transparent" }}
        onDayPress={(day) => {
          setSelectedDay(new Date(day.timestamp).toString());
          setShowWorkoutsPopover(true);
        }}
        hideExtraDays
        markedDates={dates}
      />
      <CustomPopover
        setShowPopover={setShowWorkoutsPopover}
        showPopover={showWorkoutsPopover}
        content={<DayPopover day={selectedDay} />}
        popOverheight={0.8}
        popOverwidth={0.9}
      />
    </View>
  );
}

export default WorkoutsCalender;
