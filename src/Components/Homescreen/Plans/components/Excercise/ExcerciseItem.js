import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { DatabaseContext } from "../../../../../../context/DataContext";
function ExcerciseItem({ excercise,deleteExcercise }) {
  const { deletePlanExcercise } = useContext(DatabaseContext);
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
