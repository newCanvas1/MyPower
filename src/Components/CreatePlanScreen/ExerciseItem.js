import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { langChoice } from "../../utility/functions/langChoice";
import { useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";

export default ExerciseItem = ({ item, deleteItem }) => {
  const { language } = useContext(LanguageContext);
  return (
    <View className="flex-row justify-between">
      <View className="flex-row  w-[85%] items-center rounded  bg-green-300 py-2 px-2 shadow ">
        <Text
          style={{ fontFamily: langChoice(language, "en", "ar") }}
          className=" font-bold "
        >
          {item.name}
        </Text>
      </View>
      <TouchableOpacity
        className="bg-red-500 text-white font-bold py-2 px-2 ml-2 rounded"
        onPress={() => {
          deleteItem(item);
        }}
      >
        <Icon name="delete" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};
