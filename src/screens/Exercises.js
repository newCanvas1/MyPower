import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { LanguageContext } from "../../context/LanguageContext";
import { DatabaseContext } from "../../context/DataContext";
import { ThemeContext } from "../../context/ThemeContext";
import AnimatedView from "../Components/General/AnimatedView";
import Exercise from "../Components/ExercisesScreen/Exercise";
import { langChoice } from "../utility/functions/langChoice";
import { ENGLISH, ARABIC } from "../utility/labels";
import CustomPopover from "../Components/General/CustomPopover";
import AddExercise from "../Components/CreatePlanScreen/AddExcercise";
function Exercises() {
  const { language } = useContext(LanguageContext);
  const [showAddNew, setShowAddNew] = useState(false);
  const { getSortedExercises, updateExercises, exercises } =
    useContext(DatabaseContext);
  const { theme } = useContext(ThemeContext);
  const [exercisesList, setExercisesList] = useState([]);
  useEffect(() => {
    getSortedExercises().then((data) => {
      setExercisesList(data);
    });
  }, [updateExercises, exercises]);
  const { addExercise } = useContext(DatabaseContext);

  async function add(exercise) {
    const id = await addExercise({
      name: exercise.name,
      icon: exercise.icon,
      description: exercise.description,
      notes: exercise.notes,
      category: exercise.category,
    });
    return id;
  }
  // this component should list exercises of same category one after another , and set the category on top of its first element
  return (
    <View className={theme.mainScreen + " h-[100%] "}>
      <View className="flex-row items-center justify-center mt-5 w-full">
        <Text
          className={"self-center text-2xl  " + theme.textPrimary}
          style={{ fontFamily: langChoice(language, "en", "ar") }}
        >
          {langChoice(language, ENGLISH.EXCERCISES, ARABIC.EXCERCISES)}
        </Text>
        <TouchableOpacity
          onPress={() => setShowAddNew(true)}
          className={
            " absolute  right-5 p-1 border border-white rounded "
          }
        >
          <Text
            style={{
              fontFamily: langChoice(language, "en", "ar"),
            }}
            className={" items-center justify-center " + theme.textPrimary}
          >
            {langChoice(language, ENGLISH.ADD, ARABIC.ADD)}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView className="px-5 mt-5">
        {Object.keys(exercisesList).map((category) => (
          <View className="my-5" key={category}>
            <View className={"border-l-4 px-2 rounded " + theme.border}>
              <Text
                className={"text-lg " + theme.textPrimary}
                style={{ fontFamily: langChoice(language, "en", "ar") }}
              >
                {category}
              </Text>
            </View>
            <FlatList
              data={exercisesList[category]}
              renderItem={({ item }) => (
                <AnimatedView
                  duration={400}
                  fadeIn
                  content={<Exercise exercise={item} />}
                />
              )}
              keyExtractor={(item) => item.name}
            />
          </View>
        ))}
      </ScrollView>
      <CustomPopover
        showPopover={showAddNew}
        setShowPopover={setShowAddNew}
        content={
          <AddExercise
            setShowAddingExcercise={setShowAddNew}
            addExercise={add}
          />
        }
        popOverheight={0.8}
        popOverwidth={0.8}
      />
    </View>
  );
}

export default Exercises;
