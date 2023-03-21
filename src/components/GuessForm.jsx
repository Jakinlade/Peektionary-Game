import React, { useState } from "react";
import SlugGenerator from "./SlugGenerator";

const GuessForm = (props) => {
  const [guess, setGuess] = useState("");

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleGuess(guess);
    setGuess("");
  };

  const handleGuess = (guess) => {
    const guessWords = guess.split(" ");
    const newCorrectWords = [];

    guessWords.forEach((guessWord) => {
      if (
        props.prompt.includes(guessWord) &&
        !props.correctWords.includes(guessWord)
      ) {
        newCorrectWords.push(guessWord);
      }
    });

    // Check if the guess matches the slug
    if (guessWords.includes(props.slug)) {
      newCorrectWords.push(props.slug);
    }

    props.setCorrectWords([...props.correctWords, ...newCorrectWords]);

    if (newCorrectWords.length === props.prompt.split(" ").length + 1) {
      props.handleGameWon();
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="text-2xl border-2 border-solid border-zinc-900 flex justify-around p-px bg-gray-300"
    >
      <label>
        Guess:
        <input type="text" value={guess} onChange={handleInputChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default GuessForm;
