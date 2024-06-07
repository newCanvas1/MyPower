// UsersScreen.js
import React, { useContext, useState } from "react";
import { View, Text, TextInput, FlatList, SafeAreaView } from "react-native";
import { getTable, getUserInfo, insertUser } from "../../database/database.js";
import { styles } from "../../src/styles/styles.js";
import { useRouter } from "expo-router";
import Button from "../Components/General/Button.js";
import { langChoice } from "../utility/functions/langChoice.js";
import { LanguageContext } from "../../context/LanguageContext.js";
import { ARABIC, ENGLISH } from "../utility/labels.js";
const EnterUserInput = () => {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const router = useRouter();
  const { language } = useContext(LanguageContext);
  return (
    <SafeAreaView className="w-[100%] justify-center items-center">
      <View className="w-[100%] h-[100%] flex flex-col items-center  px-10">
        <Text
          style={{ fontFamily: "appFont" }}
          className="text-center text-3xl mt-10"
        >
          {langChoice(language, ENGLISH.WELCOME, ARABIC.WELCOME)}
        </Text>
        <Text
          style={{ fontFamily: "appFont" }}
          className="text-center text-xl mt-20"
        >
          {langChoice(
            language,
            ENGLISH.PLEASE_ENTER_INFO,
            ARABIC.PLEASE_ENTER_INFO
          )}
        </Text>
        <Text
          style={{ fontFamily: "appFont" }}
          className={`${langChoice(language, "self-start", " self-end")} `}
        >
          {langChoice(language, ENGLISH.NAME, ARABIC.NAME)}
        </Text>
        <TextInput
          style={{ fontFamily: "appFont" }}
          placeholder={langChoice(
            language,
            ENGLISH.ENTER_YOUR_NAME,
            ARABIC.ENTER_YOUR_NAME
          )}
          value={name}
          onChangeText={setName}
          className={
            styles.userTextInput +
            ` ${langChoice(language, "text-left", "text-right")}`
          }
        />
        <Text
          style={{ fontFamily: "appFont" }}
          className={`${langChoice(language, "self-start", " self-end")} `}
        >
          {langChoice(language, ENGLISH.HEIGHT, ARABIC.HEIGHT)}
        </Text>

        <TextInput
          style={{ fontFamily: "appFont" }}
          placeholder={langChoice(
            language,
            ENGLISH.ENTER_HEIGHT,
            ARABIC.ENTER_HEIGHT
          )}
          value={height}
          onChangeText={setHeight}
          className={
            styles.userTextInput +
            ` ${langChoice(language, "text-left", "text-right")}`
          }
        />
        <Text
          style={{ fontFamily: "appFont" }}
          className={`${langChoice(language, "self-start", " self-end")} `}
        >
          {langChoice(language, ENGLISH.WEIGHT, ARABIC.WEIGHT)}
        </Text>
        <TextInput
          style={{ fontFamily: "appFont" }}
          placeholder={langChoice(
            language,
            ENGLISH.ENTER_WEIGHT,
            ARABIC.ENTER_WEIGHT
          )}
          value={weight}
          onChangeText={setWeight}
          className={
            styles.userTextInput +
            ` ${langChoice(language, "text-left", "text-right")}`
          }
        />
        <View className="mt-10">
          <Button
            label={langChoice(language, ENGLISH.CONFIRM, ARABIC.CONFIRM)}
            func={async () => {
              await insertUser(name, weight, height);
              router.replace("/(tabs)");
            }}
            color={"green"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EnterUserInput;
