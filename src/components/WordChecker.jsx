// WordChecker.jsx
import React, { useContext, useCallback } from "react";
import GameContext from "./GameContext";

const WordChecker = ({ guess, setGuess }) => {
  const { phrase, setGuessedWords } = useContext(GameContext);

  const checkGuess = useCallback(() => {
    const normalizedGuess = guess.trim().toLowerCase();
    const phraseWords = phrase.toLowerCase().split(/\s+/);
    const matchedIndices = [];

    phraseWords.forEach((word, index) => {
      if (word === normalizedGuess) {
        matchedIndices.push(index);
      }
    });

    if (matchedIndices.length > 0) {
      setGuessedWords((prevGuessedWords) => {
        const newGuessedWords = [...prevGuessedWords];
        matchedIndices.forEach((index) => {
          newGuessedWords[index] = phraseWords[index];
        });
        return newGuessedWords;
      });
    }

    // Clear the guess input after checking
    setGuess("");
  }, [guess, phrase, setGuessedWords, setGuess]);

  // Invoke checkGuess when the component mounts or when guess changes
  React.useEffect(() => {
    checkGuess();
  }, [checkGuess]);

  // This component does not render anything, it's just for processing
  return null;
};

export default WordChecker;
