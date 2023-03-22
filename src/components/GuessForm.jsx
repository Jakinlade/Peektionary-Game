import React, { useState } from "react";
import SlugGenerator from "./SlugGenerator";

const GuessForm = ({
  difficulty,
  correctWords,
  setCorrectWords,
  handleGameWon,
}) => {
  const [guess, setGuess] = useState("");
  const slug = SlugGenerator(difficulty); // generate a new slug

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleGuess(guess);
    setGuess("");
  };

  const handleGuess = (guess) => {
    // split the guess into separate words
    const guessWords = guess.split(" ");
  
    // check if each guess word matches a prompt word
    let allWordsCorrect = true;
    guessWords.forEach((guessWord) => {
      if (!prompt.includes(guessWord) || correctWords.includes(guessWord)) {
        allWordsCorrect = false;
      }
    });
    
    console.log("Guess:", guessWords);
    console.log("All words correct:", allWordsCorrect);
  
    if (allWordsCorrect) {
      setCorrectWords([...correctWords, ...guessWords]);
      if (correctWords.length + guessWords.length === prompt.split(" ").length) {
        console.log("You win");
        handleGameWon();
      }
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
