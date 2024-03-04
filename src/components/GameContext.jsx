import React, { createContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [phrase, setPhrase] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [gameStarted, setGameStarted] = useState(false);
  const [currentGuessState, setCurrentGuessState] = useState([]);
  const [useOpenAI] = useState(false);
  const [imageGenerated, setImageGenerated] = useState(false);
  const [triggerGeneration, setTriggerGeneration] = useState(false);

  return (
    <GameContext.Provider
      value={{
        phrase,
        setPhrase,
        difficulty,
        setDifficulty,
        gameStarted,
        setGameStarted,
        currentGuessState,
        setCurrentGuessState,
        useOpenAI,
        imageGenerated,
        setImageGenerated,
        triggerGeneration,
        setTriggerGeneration,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
