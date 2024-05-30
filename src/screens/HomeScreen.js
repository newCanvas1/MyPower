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
import { getUserInfo, insertUser } from "../../database/database.js";

const HomeScreen = () => {
  async function getUser() {
    const user = await getUserInfo();
    console.log(user);
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView className=" bg-red-400">
      <Button
        title="Add User"
        onPress={() => {
          insertUser("Hello", 90, 190);
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
