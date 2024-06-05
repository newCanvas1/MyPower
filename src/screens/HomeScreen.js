import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import {
  getUserInfo,
  initDatabase,
  insertWorkout,
  getTable,
} from "../../database/database";
import Greeting from "../Components/Homescreen/Greeting";
import Plans from "../Components/Homescreen/Plans/Plans";
function Homescreen(props) {

  initDatabase();
  return (
    <View>
      <Greeting />
      <Plans />
    </View>
  );
}

export default Homescreen;
