import React, { useState, useRef, useContext } from "react";
import GameContext from "./GameContext";

const GuessForm = ({ correctWords = [], setCorrectWords, handleGameWon }) => {
  // Access the current game's slug from the context
  const { slug } = useContext(GameContext);
  const [guess, setGuess] = useState(""); // State to hold the user's current guess
  const [feedback, setFeedback] = useState(""); // State for feedback to the user
  const guessInput = useRef(null); // Reference to the guess input element for focus management

  // Update guess state and reset feedback on input change
  const handleInputChange = (event) => {
    setGuess(event.target.value);
    setFeedback("");
  };

  // Handle guess submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const lowerCaseSlugWords = slug.toLowerCase().split("-");
    const lowerCaseGuessWords = guess.trim().toLowerCase().split(" ");

    lowerCaseGuessWords.forEach((word) => {
      if (lowerCaseSlugWords.includes(word) && !correctWords.includes(word)) {
        addWordInOrder(word, lowerCaseSlugWords);
      }
    });

    setGuess(""); // Clear guess input
    guessInput.current.focus(); // Refocus on input field

    if (correctWords.length === lowerCaseSlugWords.length) {
      handleGameWon(); // Trigger game win condition
    }
  };

  // Function to add a correctly guessed word in its corresponding order
  const addWordInOrder = (word, lowerCaseSlugWords) => {
    const newCorrectWords = [...correctWords];
    const wordIndex = lowerCaseSlugWords.indexOf(word);
    newCorrectWords[wordIndex] = word; // Place word in the correct position
    setCorrectWords(newCorrectWords);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="text-lg border-2 border-solid border-zinc-900 flex justify-evenly py-px bg-gray-300">
        <label>
          Guess:
          <input type="text" value={guess} onChange={handleInputChange} ref={guessInput} />
        </label>
        <button type="submit" className="hover:font-extrabold">Submit</button>
        {feedback && <div className="feedback">{feedback}</div>}
      </form>
      <div>
        {/* Safely map over correctWords with default to empty array if undefined */}
        {correctWords.map((word, index) => (
          <span key={index}>{word ? word + ' ' : '_ '}</span>
        ))}
      </div>
    </div>
  );
};

export default GuessForm;
