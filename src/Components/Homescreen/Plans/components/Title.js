import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../../styles/styles";

function Title(props) {
  const router = useRouter();
  function addPlan() {
    router.push("/createPlan");
  }
  return (
    <View className="flex-row items-center justify-between">
      <Text style={{fontFamily:"appFont"}} className="text-2xl font-bold ">Plans</Text>
      <TouchableOpacity className={styles.addBtn} onPress={addPlan}>
        <Text  className="text-xl text-white">+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Title;
