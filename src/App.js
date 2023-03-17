import "./App.css";

import React, { useState } from "react";
import ImageGenerator from "./components/imageGenerator";
import GuessForm from "./components/GuessForm";
import DifficultySelector from "./components/DifficultySelector";

const Game = () => {
  const [prompt, setPrompt] = useState("");
  const [correctWords, setCorrectWords] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");

  const handleSelectDifficulty = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
  };

  // Use the generated word from ImagePrompt component
  const handleGeneratePrompt = (generatedWord) => {
    setPrompt(generatedWord);
  };

  const resetForm = () => {
    document.getElementById("input-bar").reset();
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
      <GuessForm handleGuess={handleGuess} resetForm={resetForm} />
      <div
        id="back-box-three"
        className="bg-rose-700 border-2 border-solid border-zinc-900"
      ></div>
    </div>
  );
};

export default Game;
