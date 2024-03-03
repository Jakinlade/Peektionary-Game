import React, { useState, useRef, useContext } from "react";
import GameContext from "./GameContext";

const GuessForm = () => {
  const { updateGuessedWords, guessedWords, phrase, gameStarted } =
    useContext(GameContext);
  const [guess, setGuess] = useState("");
  const guessInput = useRef(null);

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (gameStarted) {
      updateGuessedWords(guess);
    }
    setGuess(""); // Clear the guess input after submission
    guessInput.current.focus(); // Refocus on the input field
  };

  // Generate the placeholder display based on gameStarted
  const placeholderDisplay =
    phrase && gameStarted
      ? phrase
          .split(" ")
          .map((word, index) =>
            guessedWords && guessedWords[index]
              ? guessedWords[index]
              : "_".repeat(word.length)
          )
          .join(" ")
      : "";

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
          />
        </label>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      {/* Display the placeholders or guessed words */}
      <div className="placeholder-display">{placeholderDisplay}</div>
    </div>
  );
};

export default GuessForm;
