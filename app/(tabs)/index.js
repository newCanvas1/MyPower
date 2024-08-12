import Homescreen from "../../src/screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetDatabase } from "../../database/database";
function reset(params) {
  resetDatabase();
  AsyncStorage.clear();
}

export default function Tab() {
  // reset();
  return <Homescreen />;
}
 