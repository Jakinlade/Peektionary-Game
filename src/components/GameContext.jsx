import React, { createContext, useState, useCallback } from "react";
import SlugGenerator from "./SlugGenerator";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [phrase, setPhrase] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [gameStarted, setGameStarted] = useState(false);
  const [guessedWords, setGuessedWords] = useState([]);
  const [useOpenAI, setUseOpenAI] = useState(false);

  const toggleGenerator = useCallback(() => {
    setUseOpenAI((prevState) => !prevState);
  }, []);

  const generatePhrase = useCallback(() => {
    if (useOpenAI) {
      // Placeholder for AI-based phrase generation logic
      console.log("AI-based phrase generation logic is running...");
      // The AI generation code should also include `setPhrase` with the generated phrase
    } else {
      console.log("Local phrase generation logic is running...");
      const generatedPhrase = SlugGenerator(difficulty);
      setPhrase(generatedPhrase);
    }
  }, [useOpenAI, difficulty]);

  const updateGuessedWords = useCallback(
    (guess) => {
      console.log("Received guess:", guess);

      // Trim the guess to remove any white space
      const normalizedGuess = guess.trim().toLowerCase();
      console.log("Normalized guess:", normalizedGuess);

      // Split the Phrase into words, handling potential white spaces correctly
      const PhraseWords = phrase.toLowerCase().split(/\s+/);
      console.log("Phrase words:", PhraseWords);

      // Find all indices of the guessed word in the PhraseWords array
      const matchedIndices = PhraseWords.reduce((indices, word, index) => {
        console.log(
          `Checking if Phrase word "${word}" at index ${index} matches guess "${normalizedGuess}"`
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
              `Updating index ${index} with the correct word "${PhraseWords[index]}"`
            );
            updated[index] = PhraseWords[index];
          });

          console.log("Updated guessedWords state:", updated);
          return updated;
        });
      } else {
        console.log(`No matches found for guess "${normalizedGuess}"`);
      }
    },
    [phrase]
  );

  return (
    <GameContext.Provider
      value={{
        phrase,
        setPhrase,
        generatePhrase,
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
