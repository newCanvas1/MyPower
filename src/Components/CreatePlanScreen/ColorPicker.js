import React, { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
const colors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-gray-500",
];
function ColorPicker({ setColor }) {
  const [choice, setChoice] = useState(0);
  return (
    <View className="items-center justify-center h-20 ">
      <FlatList
        className=" w-full h-full  "
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        contentContainerStyle={{ alignItems: "center" }}
        data={colors}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setColor(item);
              setChoice(index);
            }}
          >
            <View
              className={`${item}  w-[30px] h-[30px] rounded-full ${
                index === choice && "border-2"
              }`}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        horizontal
      />
    </View>
  );
}

export default ColorPicker;
