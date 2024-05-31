import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getUserInfo,initDatabase,insertWorkout,getTable } from "../../database/database";
import Greeting from "../Components/Homescreen/Greeting";
function Homescreen(props) {
  initDatabase();
  return (
    <View>
      <Greeting />
    </View>
  );
}

export default Homescreen;
