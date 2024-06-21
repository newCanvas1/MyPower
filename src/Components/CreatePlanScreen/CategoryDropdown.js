import React, { useContext, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { LanguageContext } from "../../../context/LanguageContext";
import { ARABIC, ENGLISH } from "../../utility/labels";
import { langChoice } from "../../utility/functions/langChoice";

function CategoryDropdown({ value, setValue }) {
  const { language } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Arms", value: "Arms" },
    { label: "Biceps", value: "Biceps" },
    { label: "Triceps", value: "Triceps" },
    { label: "Shoulders", value: "Shoulders" },
    { label: "Forearms", value: "Forearms" },
    { label: "Back", value: "Back" },
    { label: "Legs", value: "Legs" },
    { label: "Chest", value: "Chest" },
    { label: "Other", value: "Other" },
  ]);

  return (
    <DropDownPicker
      style={{ width: "90%" }}
      placeholderStyle={{
        textAlign: langChoice(language, "left", "right"),
        fontFamily: langChoice(language, "en", "ar"),
      }}
      placeholder={langChoice(
        language,
        ENGLISH.CHOOSE_CATEGORY,
        ARABIC.CHOOSE_CATEGORY
      )}
      listItemLabelStyle={{
        textAlign: langChoice(language, "left", "right"),
        fontFamily: langChoice(language, "en", "ar"),
      }}
      listItemValueStyle={{
        textAlign: langChoice(language, "left", "right"),
        fontFamily: langChoice(language, "en", "ar"),
      }}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}

export default CategoryDropdown;
