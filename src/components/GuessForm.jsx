import React, { useState, useRef, useContext } from "react";
import GameContext from "./GameContext";

const GuessForm = ({ correctWords, setCorrectWords, handleGameWon }) => {
  const { slug } = useContext(GameContext);
  const [guess, setGuess] = useState("");
  const guessInput = useRef(null);

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  // const handleGuess = (guess) => {
  //   const guessWords = guess.split(" ");
  //   const newCorrectWords = [];

  //   guessWords.forEach((guessWord) => {
  //     if (prompt.includes(guessWord) && !correctWords.includes(guessWord)) {
  //       newCorrectWords.push(guessWord);
  //     }
  //   });

  //   // Check if the guess matches the slug
  //   if (guessWords.includes(slug)) {
  //     newCorrectWords.push(slug);
  //   }

  //   setCorrectWords([...correctWords, ...newCorrectWords]);

  //   if (newCorrectWords.length === prompt.split(" ").length + 1) {
  //     handleGameWon();
  //   }
  // };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const lowerCaseSlug = slug.toLowerCase();
    const lowerCaseGuess = guess.trim().toLowerCase();
    if (lowerCaseGuess === lowerCaseSlug) {
      setCorrectWords([...correctWords, lowerCaseGuess]);
      setGuess("");
      guessInput.current.focus();
      if (correctWords.length + 1 === lowerCaseSlug.split("-").length) {
        handleGameWon();
      }
    } else {
      alert("Incorrect guess. Please try again.");
    }
  };

  return (
    <form
      id="input-bar"
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
  );
};

export default GuessForm;