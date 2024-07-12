import React, { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { LanguageContext } from "../../../context/LanguageContext";
import { langChoice } from "../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../utility/labels";
import { styles } from "../../styles/styles.js";
import { DatabaseContext } from "../../../context/DataContext.js";
import { ThemeContext } from "../../../context/ThemeContext";
function RenamePopover({ setShowRenamePopover, planId,oldName }) {
  const { language } = useContext(LanguageContext);
  const { changePlanName } = useContext(DatabaseContext);
  const {theme} = useContext(ThemeContext);
  const [newName, setNewName] = useState( oldName);
  return (
    <View className="w-full h-full items-center py-5  ">
      <Text
        style={{ fontFamily: langChoice(language, "en", "ar") }}
        className={"text-center text-xl font-bold "+theme.textPrimary}
      >
        {langChoice(language, ENGLISH.RENAME, ARABIC.RENAME)}
      </Text>
      <TextInput
        className={styles.userTextInput + " mt-10" +` ${langChoice(language, "text-left", "text-right")}`}
        style={{ fontFamily: langChoice(language, "en", "ar") }}
        placeholder={langChoice(language, ENGLISH.NEW_NAME, ARABIC.NEW_NAME)}
        placeholderTextColor={"gray"}
        onChangeText={(text) => setNewName(text)}
        value={newName}
      />
      <TouchableOpacity
        className={styles.btn + " bg-green-500 w-24 h-10 justify-center items-center mt-5"}
        onPress={async () => {
          await changePlanName(planId, newName);
          setShowRenamePopover(false);
        }}
      >
        <Text
          style={{ fontFamily: langChoice(language, "en", "ar") }}
          className="text-white font-bold"
        >
          {langChoice(language, ENGLISH.CONFIRM, ARABIC.CONFIRM)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={styles.btn + " bg-red-500 w-24 h-10 justify-center items-center mt-5"}
        onPress={() => setShowRenamePopover(false)}
      >
        <Text
          style={{ fontFamily: langChoice(language, "en", "ar") }}
          className="text-white font-bold"
        >
          {langChoice(language, ENGLISH.CANCEL, ARABIC.CANCEL)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default RenamePopover;
