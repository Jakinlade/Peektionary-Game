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
    <div className="flex justify-center">
      <form onSubmit={handleFormSubmit} className="">
        <label className="">
          
          <input
            type="text"
            value={guess}
            onChange={handleInputChange}
            ref={guessInput}
            className="m-10"
            autoComplete="off"
          />
        </label>
        <button className="rounded-md bg-green-100 px-10 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          Submit
        </button>
      </form>
      <div className="align-bottom placeholder-display">{placeholderDisplay}</div>
    </div>
  );
};

export default GuessForm;
