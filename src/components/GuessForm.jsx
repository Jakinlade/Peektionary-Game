import React, { useState, useRef, useContext } from "react";
import GameContext from "./GameContext";

const GuessForm = () => {
  const { updateGuessedWords, guessedWords, slug, gameStarted } =
    useContext(GameContext);
  const [guess, setGuess] = useState("");
  const guessInput = useRef(null);

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    updateGuessedWords(guess);
    setGuess(""); // Clear the guess input after submission
    guessInput.current.focus(); // Refocus on the input field
  };

  // Generate the placeholder display based on gameStarted
  const placeholderDisplay =
    slug && gameStarted
      ? slug
          .split(" ")
          .map((word, index) =>
            guessedWords && guessedWords[index]
              ? guessedWords[index].replace(/./g, (match) =>
                  match === " " ? " " : "_"
                )
              : "_".repeat(word.length)
          )
          .join(" / ")
      : "";

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        className="text-lg border-2 border-solid border-zinc-900 flex justify-evenly py-px bg-gray-300"
      >
        <label>
          Guess:
          <input
            type="text"
            value={guess}
            onChange={handleInputChange}
            ref={guessInput}
          />
        </label>
        <button type="submit" className="hover:font-extrabold">
          Submit
        </button>
      </form>
      <div>
        {/* Display the placeholders or guessed words based on gameStarted */}
        {placeholderDisplay}
      </div>
    </div>
  );
};

export default GuessForm;
