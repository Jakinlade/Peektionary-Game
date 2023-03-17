// input bar for user to guess the word(s)
import React from "react";

const GuessForm = ({ handleGuess, resetForm }) => {
  return (
    <form
      id="input-bar"
      className="text-2xl border-2 border-solid border-zinc-900 max-w-xl flex justify-around p-px bg-gray-300"
      onSubmit={(event) => {
        event.preventDefault();
        const guess = event.target.elements.guess.value;
        handleGuess(guess);
        resetForm();
      }}
    >
      <label>
        Guess:
        <input type="text" name="guess" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default GuessForm;
