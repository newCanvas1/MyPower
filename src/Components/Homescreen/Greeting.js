import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getUserInfo } from "../../../database/database";
import { langChoice } from "../../utility/functions/langChoice";
import { LanguageContext } from "../../../context/LanguageContext";
import { ARABIC, ENGLISH } from "../../utility/labels";

function Greeting(props) {
  const [userName, serUserName] = useState("");
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    async function getUserName() {
      const user = await getUserInfo();
      serUserName(user.name);
    }
    getUserName();
  }, []);
  return (
    <View className="px-10 py-10">
      <Text
        style={{ fontFamily: "appFont" }}
        className={`text-4xl ${langChoice(language, "self-start", "self-end")}`}
      >
        {langChoice(language, ENGLISH.HI, ARABIC.HI)} {userName} ⚡️
      </Text>
    </View>
  );
}

export default Greeting;
