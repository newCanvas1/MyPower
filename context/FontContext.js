import { useFonts } from "expo-font";
import { createContext } from "react";

const FontContext = createContext(null);
export default function FontContextProvider({ children }) {
  const [fontLoaded] = useFonts({
    PoppinsLight: require("../assets/fonts/Poppins/Poppins-Light.ttf"),
    appFont: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    PoppinsExtraBold: require("../assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
  });

  if (!fontLoaded) {
    return null;
  }

  return <FontContext.Provider value={{}}>{children}</FontContext.Provider>;
}
