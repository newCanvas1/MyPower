import { useFonts } from "expo-font";
import { createContext, useContext, useEffect, useLayoutEffect } from "react";
import { LanguageContext } from "./LanguageContext";

const FontContext = createContext(null);
export default function FontContextProvider({ children }) {
  const { language } = useContext(LanguageContext);
  const [fontLoaded] = useFonts({
    PoppinsLight: require("../assets/fonts/Poppins/Poppins-Light.ttf"),
    appFont:
      language == "ar"
        ? require("../assets/fonts/Almarai/Almarai-Regular.ttf")
        : require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    PoppinsExtraBold: require("../assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
  });
useLayoutEffect(() => {
}, [language]);
  if (!fontLoaded) {
    return null;
  }

  return <FontContext.Provider value={{}}>{children}</FontContext.Provider>;
}
