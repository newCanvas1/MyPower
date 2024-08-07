import React, { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { DatabaseContext } from "../../../context/DataContext";
import { styles } from "../../styles/styles";
import { LanguageContext } from "../../../context/LanguageContext";
import { langChoice } from "../../utility/functions/langChoice";
import { ARABIC, ENGLISH } from "../../utility/labels";
import Button from "../General/Button";
import CategoryDropdown from "./CategoryDropdown";
import { ThemeContext } from "../../../context/ThemeContext";

function AddExcercise({ setShowAddingExcercise, addExercise }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Back");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const { language } = useContext(LanguageContext);
  const { reloadExercises } = useContext(DatabaseContext);
  const { theme } = useContext(ThemeContext);
  return (
    <View className="flex-col items-center mt-10 px-4">
      <Text
        className={`text-xl ${theme.textPrimary} `}
        style={{ fontFamily: langChoice(language, "en", "ar") }}
      >
        {langChoice(language, ENGLISH.ADD_EXERCISE, ARABIC.ADD_EXCERCISE)}
      </Text>
      <View className="h-20"></View>
      <Text
        className={`${langChoice(language, "self-start", "self-end")} ${
          theme.textPrimary
        } `}
        style={{ fontFamily: langChoice(language, "en", "ar") }}
      >
        {langChoice(language, ENGLISH.NAME, ARABIC.NAME)}
      </Text>
      <TextInput
        placeholderTextColor={"gray"}
        style={{ fontFamily: langChoice(language, "en", "ar") }}
        className={
          styles.userTextInput +
          `${langChoice(language, " text-left", " text-right")}`
        }
        placeholder={langChoice(
          language,
          ENGLISH.ENTER_A_NAME,
          ARABIC.ENTER_A_NAME
        )}
        onChangeText={(text) => setName(text)}
      />
      <Text
        className={`${langChoice(language, "self-start", "self-end")} mt-2 ${
          theme.textPrimary
        }  `}
        style={{ fontFamily: langChoice(language, "en", "ar") }}
      >
        {langChoice(language, ENGLISH.CATEGORY, ARABIC.CATEGORY)}
      </Text>
      <View className="mt-3 z-10">
        <CategoryDropdown value={category} setValue={setCategory} />
      </View>

      <Text
        className={`${langChoice(language, "self-start", "self-end")} mt-2 ${
          theme.textPrimary
        }  `}
        style={{ fontFamily: langChoice(language, "en", "ar") }}
      >
        {langChoice(language, ENGLISH.DESCRIBTION, ARABIC.DESCRIBTION)}
      </Text>
      <TextInput
        placeholderTextColor={"gray"}
        style={{ fontFamily: langChoice(language, "en", "ar") }}
        className={
          styles.userTextInput +
          `${langChoice(language, " text-left", " text-right")}`
        }
        placeholder={langChoice(
          language,
          ENGLISH.ENTER_A_DESCRIPTION,
          ARABIC.ENTER_A_DESCRIPTION
        )}
        onChangeText={(text) => setDescription(text)}
      />
      <Text
        className={`${langChoice(language, "self-start", "self-end")} mt-2 ${
          theme.textPrimary
        } `}
        style={{ fontFamily: langChoice(language, "en", "ar") }}
      >
        {langChoice(language, ENGLISH.NOTES, ARABIC.NOTES)}
      </Text>
      <TextInput
        placeholderTextColor={"gray"}
        style={{ fontFamily: langChoice(language, "en", "ar") }}
        className={
          styles.userTextInput +
          `${langChoice(language, " text-left", " text-right")} `
        }
        placeholder={langChoice(
          language,
          ENGLISH.ENTER_NOTES,
          ARABIC.ENTER_NOTES
        )}
        onChangeText={(text) => setNotes(text)}
      />

      <View className="flex-col h-28 mt-10 justify-between">
        <Button
          color="green"
          func={async () => {
            const added = await addExercise({
              name,
              icon,
              description,
              notes,
              category,
            });
            reloadExercises();

            setShowAddingExcercise(false);
          }}
          label={langChoice(language, ENGLISH.CONFIRM, ARABIC.CONFIRM)}
        />
        <Button
          color="red"
          func={() => {
            setShowAddingExcercise(false);
          }}
          label={langChoice(language, ENGLISH.CANCEL, ARABIC.CANCEL)}
        />
      </View>
    </View>
  );
}

export default AddExcercise;
