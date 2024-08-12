import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";

export const SoundsContext = React.createContext();

export function SoundsProvider({ children }) {
  const [sound, setSound] = useState();

  async function playSound(soundToPlay) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(soundToPlay);
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
  }
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SoundsContext.Provider value={{ sound, playSound }}>
      {children}
    </SoundsContext.Provider>
  );
}
