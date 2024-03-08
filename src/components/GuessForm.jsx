// GuessForm.jsx
import React, { useState, useRef, useContext } from "react";
import GameContext from "./GameContext";

const GuessForm = () => {
  const { phrase, currentGuessState, setCurrentGuessState } =
    useContext(GameContext);
  const [guess, setGuess] = useState("");
  const guessInput = useRef(null);

  const handleInputChange = (e) => {
    setGuess(e.target.value); // Update the guess state with input
    // console.log("Guess Updated:", e.target.value); // Log for debugging
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with guess:", guess);

    const normalizedGuess = guess.trim().toLowerCase();
    const phraseWords = phrase.toLowerCase().split(/\s+/);
    const matchedIndices = [];

    phraseWords.forEach((word, index) => {
      if (word === normalizedGuess) {
        matchedIndices.push(index);
      }
    });

    if (matchedIndices.length > 0) {
      setCurrentGuessState((prevCurrentGuessState) => {
        const newCurrentGuessState = [...prevCurrentGuessState];
        matchedIndices.forEach((index) => {
          newCurrentGuessState[index] = phraseWords[index];
        });
        return newCurrentGuessState;
      });
    }

    // Clear the guess input after checking
    setGuess("");
  };

  // Generate the placeholder display based on gameStarted and currentGuessState
  const placeholderDisplay = currentGuessState
    .map((word) => word || "_".repeat(word.length))
    .join(" ");

  return (
    <div className="guess-form-container">
      <form onSubmit={handleFormSubmit} className="guess-form">
        <label className="guess-label">
          Guess:
          <input
            type="text"
            value={guess}
            onChange={handleInputChange}
            ref={guessInput}
            className="guess-input"
            autoComplete="off"
          />
        </label>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <div className="placeholder-display">{placeholderDisplay}</div>
    </div>
  );
};

export default GuessForm;
