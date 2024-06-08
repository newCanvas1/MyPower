import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

function CategoryDropdown({ value, setValue }) {
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
