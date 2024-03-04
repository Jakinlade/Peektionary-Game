// GuessForm.jsx
import React, { useState, useRef, useContext } from "react";
import GameContext from "./GameContext";
import WordChecker from "./WordChecker";

const GuessForm = () => {
  const { guessedWords, gameStarted } = useContext(GameContext);
  const [guess, setGuess] = useState("");
  const guessInput = useRef(null);

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // The input for the guess will be handled by WordChecker
    // Clear the input field and refocus after submission
    setGuess("");
    guessInput.current.focus();
  };

  // Generate the placeholder display based on gameStarted and guessedWords
  const placeholderDisplay = guessedWords
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
      {gameStarted && <WordChecker guess={guess} setGuess={setGuess} />}
      <div className="placeholder-display">{placeholderDisplay}</div>
    </div>
  );
};

export default GuessForm;
