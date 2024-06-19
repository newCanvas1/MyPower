import React, { useContext, useEffect, useState } from "react";
import { getWorkoutDates } from "../../../../database/database";
import { Calendar } from "react-native-calendars";
import { WorkoutContext } from "../../../../context/WorkoutContext";
import { DatabaseContext } from "../../../../context/DataContext";
import { langChoice } from "../../../utility/functions/langChoice";
import { LanguageContext } from "../../../../context/LanguageContext";

function WorkoutsCalender() {
  const [dates, setDates] = useState({});
  const { updateWorkouts } = useContext(DatabaseContext);
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    getWorkoutDates().then((data) => {
      setDates(data);
    });
  }, [updateWorkouts]);
  return (
    <Calendar
      style={{ height: 100, width: 350,alignSelf:"center" }}
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
        console.log("selected day", day);
      }}
      hideExtraDays
      markedDates={dates}
    />
  );
}

export default WorkoutsCalender;
