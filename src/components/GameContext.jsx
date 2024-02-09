import React, { createContext, useState, useCallback } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [slug, setSlug] = useState("");
  const [difficulty, setDifficulty] = useState("easy"); // Default difficulty

  // Function to generate and set the slug based on current difficulty
  const generateSlug = useCallback(() => {
    // Your slug generation logic here, possibly using SlugGenerator and difficulty
    // For example: setSlug(SlugGenerator(difficulty));
  }, [difficulty]);

  return (
    <GameContext.Provider value={{ slug, setSlug, generateSlug, difficulty, setDifficulty }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
