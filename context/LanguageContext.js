import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState("ar");
  // stores the last signed in language by the user in the device local storage
  const storeData = async (language) => {
    try {
      // set language in local storage.
      await AsyncStorage.setItem("language", language);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  // gets the last signed in language by the user from the device local storage
  const getData = async () => {
    try {
      const language = await AsyncStorage.getItem("language");
      // if there is a language registered in local storage.
      if (language !== null) {
        // value previously stored
        setLanguage(language);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    // get last registered language from device storage.
    getData();

    // if a language is previously registered then reload the component.
  }, [language]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage,storeData }}>
      {children}
    </LanguageContext.Provider>
  );
};
