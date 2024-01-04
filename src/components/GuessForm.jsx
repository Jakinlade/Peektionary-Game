import React, { useState, useRef, useContext } from "react";
import GameContext from "./GameContext";

// GuessForm component for handling user guesses and displaying correct guesses
const GuessForm = ({ correctWords, setCorrectWords, handleGameWon }) => {
  const { slug } = useContext(GameContext); // Accessing the slug from the GameContext
  const [guess, setGuess] = useState(""); // State for the user's guess input
  const [feedback, setFeedback] = useState(""); // State for providing feedback to the user
  const guessInput = useRef(null); // Ref for the guess input field

  // Handler for changes in the guess input field
  const handleInputChange = (event) => {
    setGuess(event.target.value); // Update the guess state with the new input
    setFeedback(""); // Reset feedback when user types a new guess
  };

  // Handler for form submission
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const lowerCaseSlugWords = slug.toLowerCase().split("-"); // Split the slug into lowercase words
    const lowerCaseGuessWords = guess.trim().toLowerCase().split(" "); // Split the guess into lowercase words

    // Process each guessed word
    lowerCaseGuessWords.forEach((word) => {
      if (lowerCaseSlugWords.includes(word) && !correctWords.includes(word)) {
        addWordInOrder(word); // Add correctly guessed word in order
      }
    });

    // Clear the input field and refocus
    setGuess("");
    guessInput.current.focus();

    // Check if all words are guessed correctly
    if (correctWords.length === lowerCaseSlugWords.length) {
      handleGameWon(); // Trigger game won logic
    }
  };

  // Function to add correctly guessed word in order
  const addWordInOrder = (word) => {
    const newCorrectWords = [...correctWords];
    const wordIndex = lowerCaseSlugWords.indexOf(word);
    newCorrectWords[wordIndex] = word; // Insert the word at the correct position
    setCorrectWords(newCorrectWords); // Update the correctWords state
  };

  // Render the guess form and display of correct words
  return (
    <div>
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
        {feedback && <div className="feedback">{feedback}</div>} {/* Display feedback */}
      </form>
      <div>
        {/* Display correctly guessed words in order */}
        {correctWords.map((word, index) => (
          <span key={index}>{word ? word + ' ' : '_ '}</span>
        ))}
      </div>
    </div>
  );
};

export default GuessForm;
