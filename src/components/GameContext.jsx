import React, { createContext, useState, useCallback } from "react";
import SlugGenerator from "./SlugGenerator"; // Import the SlugGenerator function

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [slug, setSlug] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [gameStarted, setGameStarted] = useState(false); // Added to track if the game has started

  // Updated generateSlug function that uses SlugGenerator
  const generateSlug = useCallback(() => {
    const newSlug = SlugGenerator(difficulty); // Generate slug based on difficulty
    setSlug(newSlug); // Update the slug in context
  }, [difficulty]); // Dependency array includes difficulty, as slug generation depends on it

  // This context now also provides gameStarted state and its setter
  // This allows components to start the game when appropriate (e.g., after image load)
  return (
    <GameContext.Provider value={{ slug, setSlug, generateSlug, difficulty, setDifficulty, gameStarted, setGameStarted }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
