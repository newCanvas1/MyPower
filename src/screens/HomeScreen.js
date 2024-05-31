import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getUserInfo } from "../../database/database";
import Greeting from "../Components/Homescreen/Greeting";
function Homescreen(props) {
  return (
    <View>
      <Greeting />
    </View>
  );
}

export default Homescreen;
