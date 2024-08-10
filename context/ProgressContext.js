import { createContext, useEffect, useState } from "react";
import { addLevel, getLevel, getXp, resetXp } from "../database/database";

export const ProgressContext = createContext();

export const ProgressContextProvider = ({ children }) => {
  const [HYPOTHETICAL_MAX] = useState(20);
  const [level, setLevel] = useState(1);
  const [currentXp, setCurrentXp] = useState(0);
  const [totalXp, setTotalXp] = useState(HYPOTHETICAL_MAX);
  function adjustLevel() {
    if (currentXp >= totalXp) {
      levelUp();
      setCurrentXp(0);
      setTotalXp(level * HYPOTHETICAL_MAX);
    }
  }
  function addXp(newXp) {
    setCurrentXp(currentXp + newXp);
  }
  async function getUserXp() {
    const xp = await getXp();

    if (xp != null) {
      setCurrentXp(xp);
    } else {
      setCurrentXp(0);
    }
  }
  async function reloadXp() {
    await getUserXp();
  }

  async function getUserLevel() {
    const level = await getLevel();
    setLevel(level);
    setTotalXp(level * HYPOTHETICAL_MAX);
  }
  async function levelUp() {
    await addLevel();
    await resetXp();
    reloadXp();
    getUserLevel();
  }
  useEffect(() => {
    adjustLevel();
  }, [currentXp]);
  useEffect(() => {
    getUserLevel();
    getUserXp();
  }, []);
  return (
    <ProgressContext.Provider
      value={{
        level,
        setLevel,
        currentXp,
        setCurrentXp,
        totalXp,
        setTotalXp,
        addXp,
        reloadXp,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};