import React, { createContext, useState, useCallback } from "react";
import SlugGenerator from "./SlugGenerator";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [slug, setSlug] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [gameStarted, setGameStarted] = useState(false);
  const [guessedWords, setGuessedWords] = useState([]);
  const [useOpenAI, setUseOpenAI] = useState(false);

  const toggleGenerator = useCallback(() => {
    setUseOpenAI((prevState) => !prevState);
  }, []);

  const generateSlug = useCallback(() => {
    if (useOpenAI) {
      // Logic to call OpenAIWordGenerator
      // You might need to handle this asynchronously
    } else {
      const newSlug = SlugGenerator(difficulty);
      setSlug(newSlug);
      setGuessedWords(newSlug.split(" ").map(() => null));
    }
  }, [useOpenAI, difficulty]);

  const updateGuessedWords = useCallback(
    (guess) => {
      console.log("Received guess:", guess);

      // Trim the guess to remove any white space
      const normalizedGuess = guess.trim().toLowerCase();
      console.log("Normalized guess:", normalizedGuess);

      // Split the slug into words, handling potential white spaces correctly
      const slugWords = slug.toLowerCase().split(/\s+/);
      console.log("Slug words:", slugWords);

      // Find all indices of the guessed word in the slugWords array
      const matchedIndices = slugWords.reduce((indices, word, index) => {
        console.log(
          `Checking if slug word "${word}" at index ${index} matches guess "${normalizedGuess}"`
        );
        if (word === normalizedGuess) {
          console.log(`Match found for "${normalizedGuess}" at index ${index}`);
          indices.push(index);
        }
        return indices;
      }, []);

      console.log("Matched indices:", matchedIndices);

      if (matchedIndices.length > 0) {
        setGuessedWords((prev) => {
          console.log("Previous guessedWords state:", prev);

          // Create a copy of the previous guessed words array
          const updated = [...prev];

          // Update the placeholders for all matched indices with the correct word
          matchedIndices.forEach((index) => {
            console.log(
              `Updating index ${index} with the correct word "${slugWords[index]}"`
            );
            updated[index] = slugWords[index];
          });

          console.log("Updated guessedWords state:", updated);
          return updated;
        });
      } else {
        console.log(`No matches found for guess "${normalizedGuess}"`);
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
        toggleGenerator,
        useOpenAI,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
