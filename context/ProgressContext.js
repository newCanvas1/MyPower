import { createContext, useContext, useEffect, useState } from "react";

export const ProgressContext = createContext();

export const ProgressContextProvider = ({ children }) => {
  const [HYPOTHETICAL_MAX] = useState(50);
  const [level, setLevel] = useState(1); 
  const [currentXp, setCurrentXp] = useState(240);     
  const [totalXp, setTotalXp] = useState(level * HYPOTHETICAL_MAX);
  function adjustLevel() {
    if (currentXp >= totalXp) {
      const newLevel = level + Math.floor(currentXp / HYPOTHETICAL_MAX);
      setLevel(newLevel);
      setTotalXp(newLevel * HYPOTHETICAL_MAX);
    }
  }
  function addXp() {
    setCurrentXp(currentXp + 20);
  }
  useEffect(() => {
    adjustLevel();
    console.log(level);
  }, [currentXp]);
  return (
    <ProgressContext.Provider
      value={{
        level,
        setLevel,
        currentXp,
        setCurrentXp,
        totalXp,
        setTotalXp,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
