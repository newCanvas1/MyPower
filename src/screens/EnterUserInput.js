// UsersScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  SafeAreaView,
} from "react-native";
import { getTable, getUserInfo, insertUser } from "../../database/database.js";
import { styles } from "../../src/styles/styles.js";
import { useRouter } from "expo-router";

const EnterUserInput = () => {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const router = useRouter();
  

  return (
    <SafeAreaView className="w-[100%] justify-center items-center">
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        className={styles.userTextInput}
      />
      <TextInput
        placeholder="Enter your height"
        value={height}
        onChangeText={setHeight}
        className={styles.userTextInput}
      />
      <TextInput
        placeholder="Enter your weight"
        value={weight}
        onChangeText={setWeight}
        className={styles.userTextInput}
      />
      <Button
        title="Add User"
        onPress={() => {
          insertUser(name, weight, height);
        }}
      />
    </SafeAreaView>
  );
};

export default EnterUserInput;
