import React, { createContext, useState, useCallback } from "react";
import SlugGenerator from "./SlugGenerator"; // Import the SlugGenerator function

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [slug, setSlug] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [gameStarted, setGameStarted] = useState(false);
  // Initialize state to track the guessed words in order
  const [guessedWords, setGuessedWords] = useState([]);

  // Updated generateSlug function that uses SlugGenerator
  const generateSlug = useCallback(() => {
    const newSlug = SlugGenerator(difficulty);
    setSlug(newSlug);
    // Reset guessedWords with placeholders for each word in the new slug
    const placeholders = newSlug.split(" ").map(() => null);
    setGuessedWords(placeholders);
  }, [difficulty]);

  // Method to update guessed words based on the user's guess
  const updateGuessedWords = useCallback(
    (guess) => {
      // Split the slug into words and lowercase for comparison
      const slugWords = slug.toLowerCase().split(" ");
      const guessIndex = slugWords.indexOf(guess.toLowerCase());

      // If the guessed word is part of the slug, update its position in guessedWords
      if (guessIndex !== -1) {
        setGuessedWords((prevGuessedWords) => {
          const newGuessedWords = [...prevGuessedWords];
          newGuessedWords[guessIndex] = slugWords[guessIndex]; // Update with the original word case from slug
          console.log(
            "Correctly guessed words:",
            newGuessedWords.filter((word) => word !== null).join(", ")
          );
          return newGuessedWords;
        });
      }
    },
    [slug]
  );

  return (
    <GameContext.Provider
      value={{
        slug,
        setSlug,
        generateSlug,
        difficulty,
        setDifficulty,
        gameStarted,
        setGameStarted,
        guessedWords,
        updateGuessedWords,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
