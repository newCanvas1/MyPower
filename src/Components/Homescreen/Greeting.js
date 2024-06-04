import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getUserInfo } from "../../../database/database";

function Greeting(props) {
  const [userName, serUserName] = useState("");
  useEffect(() => {
    async function getUserName() {
      const user = await getUserInfo();
      serUserName(user.name);
    }
    getUserName();
  }, []);
  return (
    <View className="px-10 py-10">
      <Text style={{ fontFamily: "appFont" }} className=" text-4xl ">
        Hi {userName} ⚡️
      </Text>
    </View>
  );
}

export default Greeting;
