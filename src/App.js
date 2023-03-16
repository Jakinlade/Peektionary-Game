import "./App.css";

import React, { useState } from "react";
import DifficultySelector from "./components/DifficultySelector";
// import Image from "./components/Image";
import ImageGenerator from "./components/imageGenerator";

const Game = () => {
  const [prompt, setPrompt] = useState("");
  const [correctWords, setCorrectWords] = useState([]);

  const handleSelectDifficulty = (difficulty) => {
    const initialPrompt = "dog"; // replace this with the initial seed word you want to use
    let promptWords = [initialPrompt];

    for (let i = 0; i < difficulty - 1; i++) {
      // use ChatGPT to generate the next word based on the previous words
      // and add it to the promptWords array
    }

    setPrompt(promptWords.join(" "));
  };

  const handleGuess = (guess) => {
    // split the guess into separate words
    const guessWords = guess.split(" ");
    const newCorrectWords = [];

    // check if each guess word matches a prompt word
    guessWords.forEach((guessWord) => {
      if (prompt.includes(guessWord) && !correctWords.includes(guessWord)) {
        newCorrectWords.push(guessWord);
      }
    });

    // update the list of correct words
    setCorrectWords([...correctWords, ...newCorrectWords]);
  };

  return (
    <div>
      <DifficultySelector onSelectDifficulty={handleSelectDifficulty} />
      <div>
        <ImageGenerator />
      </div>
      <div>
        {prompt.split(" ").map((word, index) => {
          if (correctWords.includes(word)) {
            return <span key={index}>{word} </span>;
          } else {
            return <span key={index}>_</span>;
          }
        })}
      </div>
      <form id="input-bar" class="text-2xl border-2 border-solid border-zinc-900 max-w-xl flex justify-around p-px bg-gray-300"
        onSubmit={(event) => {
          event.preventDefault();
          const guess = event.target.elements.guess.value;
          handleGuess(guess);
          event.target.reset();
        }}
      >
        <label>
          Guess:
          <input type="text" name="guess" />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div id="back-box-three" class="bg-rose-700 border-2 border-solid border-zinc-900"></div>
    </div>
  );
};

export default Game;