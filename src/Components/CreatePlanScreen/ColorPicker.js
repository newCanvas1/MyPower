import React, { useContext, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { colors } from "../../styles/styles";
import { ThemeContext } from "../../../context/ThemeContext";
function ColorPicker({ setColor }) {
  const [choice, setChoice] = useState(0);
  const {theme} = useContext(ThemeContext);
  useEffect(() => {
    setColor(colors[0]);
  }, []);
  return (
    <View className="items-center justify-center h-20 ">
      <FlatList
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        contentContainerStyle={{ alignItems: "center", paddingHorizontal: 10 }}
        data={colors}
        renderItem={({ item, index }) => (
          <View
            className={`p-[3] ${index === choice && "border-b-4 rounded "} ${theme.border}`}
          >
            <TouchableOpacity
              onPress={() => {
                setColor(item);
                setChoice(index);
              }}
            >
              <View className={`${item}  w-[30px] h-[30px] rounded-full `} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item}
        horizontal
      />
    </View>
  );
}

export default ColorPicker;
