import { View } from "react-native";
import Greeting from "../Components/Homescreen/Greeting";
import Plans from "../Components/Homescreen/Plans/Plans";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
function Homescreen(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <View className={" h-full " + theme.mainScreen}>
      <Greeting />
      <Plans />
    </View>
  );
}

export default Homescreen;
