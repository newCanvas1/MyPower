import { View } from "react-native";
import Greeting from "../Components/Homescreen/Greeting";
import Plans from "../Components/Homescreen/Plans/Plans";
function Homescreen(props) {
  return (
    <View className="mt-10">
      <Greeting />
      <Plans />
    </View>
  );
}

export default Homescreen;
