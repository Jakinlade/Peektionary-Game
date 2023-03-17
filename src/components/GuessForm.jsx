import React, { useState } from "react";

const GuessForm = (props) => {
  const [guess, setGuess] = useState("");

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.onGuess(guess);
    setGuess("");
  };

  const handleGuess = (guess) => {
    console.log(props.prompt);
    console.log(props.correctWords);
    const guessWords = guess.split(" ");
    const newCorrectWords = [];
  
    guessWords.forEach((guessWord) => {
      if (props.prompt.includes(guessWord) && !props.correctWords.includes(guessWord)) {
        newCorrectWords.push(guessWord);
      }
    });
  
    props.setCorrectWords([...props.correctWords, ...newCorrectWords]);
  
    if (newCorrectWords.length === props.prompt.split(" ").length) {
      props.handleGameWon();
    }
  };
  

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Guess:
        <input type="text" value={guess} onChange={handleInputChange} />
      </label>
      <button type="submit" onClick={() => handleGuess(guess)}>Submit</button>
    </form>
  );
};

export default GuessForm;