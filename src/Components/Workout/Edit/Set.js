import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { ARABIC, ENGLISH } from "../../../utility/labels";
import { langChoice } from "../../../utility/functions/langChoice";
import { LanguageContext } from "../../../../context/LanguageContext";
import { WorkoutContext } from "../../../../context/WorkoutContext";
import { ThemeContext } from "../../../../context/ThemeContext";
import Feather from "@expo/vector-icons/Feather";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import AnimatedView from "../../General/AnimatedView";
function Set({ set, count, setSetsToUpdate, setsToUpdate, setSetsToDelete }) {
  const [reps, setReps] = useState(set.reps);
  const [weight, setWeight] = useState(set.weight);
  const [setOrder] = useState(count);
  const [setChecked, setSetChecked] = useState(set?.checked);
  const [isDragging, setIsDragging] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);

  const setBackground = setChecked ? "bg-green-400 opacity-60" : " ";
  const translateX = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {}, []);

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
        },
      },
    ],
    { useNativeDriver: true }
  );
  const onHandlerStateChange = (event) => {
    // check if the set is being dragged
    if (event.nativeEvent.state === State.ACTIVE) {
      setIsDragging(true);
    } else {
      setIsDragging(false);
    }

    // Check if the gesture state is END or CANCELLED (these values are 5 and 6)
    if (
      event.nativeEvent.state === State.END ||
      event.nativeEvent.state === State.CANCELLED
    ) {
      // Check if the translation exceeds the threshold (e.g., 100)
      if (Math.abs(event.nativeEvent.translationX) > 100) {
        // Remove the set if the threshold is exceeded
        setFadeOut(true);
        setTimeout(() => {
          setSetsToUpdate((prev) => {
            const newSets = { ...prev };
            const listofSets = newSets[set.exerciseId];
            for (let i = 0; i < listofSets.length; i++) {
              if (listofSets[i].id === set.id) {
                listofSets.splice(i, 1);
                break;
              }
            }
            newSets[set.exerciseId] = listofSets;
            return newSets;
          });
          if (set.type != "new") {
            setSetsToDelete((prev) => {
              const newSets =prev ;
              newSets.push(set.id);
              return newSets;
            });
          }
        }, 300);
      } else {
        // Reset the position if the threshold is not exceeded
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  return (
    <AnimatedView
      content={
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View style={[{ transform: [{ translateX }] }]}>
            <View
              className={`${setBackground} p-1 shadow w-[100%] flex-row justify-between items-center rounded `}
            >
              <Text
                className={theme.textPrimary}
                style={{ fontFamily: langChoice(language, "en", "ar") }}
              >
                {setOrder}
              </Text>
              <View className="w-20 items-center ">
                {weight == 0 || reps == 0 ? (
                  <View className="bg-slate-500  w-[50%] h-1"></View>
                ) : (
                  <Text
                    className={theme.textPrimary}
                    style={{ fontFamily: langChoice(language, "en", "ar") }}
                  >
                    {`${weight} kg x ${reps}`}
                  </Text>
                )}
              </View>

              <TextInput
                keyboardType="numeric"
                style={{ fontFamily: langChoice(language, "en", "ar") }}
                placeholderTextColor={theme.setPlaceholder}
                placeholder={
                  weight == 0
                    ? langChoice(language, ENGLISH.WEIGHT, ARABIC.WEIGHT)
                    : weight.toString()
                }
                onChangeText={(text) => {
                  setSetsToUpdate((prev) => {
                    const newSets = { ...prev };
                    const listofSets = newSets[set.exerciseId];
                    for (let i = 0; i < listofSets.length; i++) {
                      if (listofSets[i].id === set.id) {
                        listofSets[i].weight = text;
                        break;
                      }
                    }
                    newSets[set.exerciseId] = listofSets;
                    return newSets;
                  });
                }}
                className={
                  theme.set + theme.setInputBorder + " " + theme.inputValue
                }
              />
              <TextInput
                keyboardType="numeric"
                style={{ fontFamily: langChoice(language, "en", "ar") }}
                placeholderTextColor={theme.setPlaceholder}
                placeholder={
                  reps == 0
                    ? langChoice(language, ENGLISH.REPS, ARABIC.REPS)
                    : reps.toString()
                }
                onChangeText={(text) => {
                  setSetsToUpdate((prev) => {
                    const newSets = { ...prev };
                    const listofSets = newSets[set.exerciseId];
                    for (let i = 0; i < listofSets.length; i++) {
                      if (listofSets[i].id === set.id) {
                        listofSets[i].reps = text;
                        break;
                      }
                    }
                    newSets[set.exerciseId] = listofSets;
                    return newSets;
                  });
                }}
                className={
                  theme.set + theme.setInputBorder + " " + theme.inputValue
                }
              />
              <TouchableOpacity
                onPress={() => {
                  setSetsToUpdate((prev) => {
                    const newSets = { ...prev };
                    const listofSets = newSets[set.exerciseId];
                    for (let i = 0; i < listofSets.length; i++) {
                      if (listofSets[i].id === set.id) {
                        setSetChecked(!listofSets[i].checked);
                        listofSets[i].checked = !listofSets[i].checked;
                        break;
                      }
                    }
                    newSets[set.exerciseId] = listofSets;
                    return newSets;
                  });
                }}
                className={`${
                  set.checked ? "bg-green-400" : " "
                } rounded border shadow p-[1px]`}
              >
                <Feather name="check" size={20} color={theme.color} />
              </TouchableOpacity>
              {(fadeOut || isDragging) && (
                <View className={` bg-red-400 p-1 shadow rounded`}>
                  <Feather name="x" size={20} color={theme.color} />
                </View>
              )}
            </View>
          </Animated.View>
        </PanGestureHandler>
      }
      fadeOut={fadeOut}
      duration={400}
    />
  );
}

export default Set;
