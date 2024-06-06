import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
function ExcerciseItem({ excercise, deleteExcercise }) {
  return (
    <View>
      <Text>{excercise.name}</Text>
      <Icon name="dumbbell" size={20} color="green" />
      <TouchableOpacity
        onPress={() => {
          deleteExcercise(excercise.id);
        }}
      >
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ExcerciseItem;
