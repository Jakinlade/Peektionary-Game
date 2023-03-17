import "./App.css";
import CountdownTimer from "./components/CountdownTimer";
import React, { useState } from "react";
import ImageGenerator from "./components/imageGenerator";
import GuessForm from "./components/GuessForm";
import DifficultySelector from "./components/DifficultySelector";
import PromptDisplay from "./components/PromptDisplay";
import ImagePrompt from "./components/ImagePrompt";

const Game = () => {
  const [prompt, setPrompt] = useState("");
  const [correctWords, setCorrectWords] = useState([]);
  const [difficulty, setDifficulty] = useState("medium");

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

    if (newCorrectWords.length === prompt.split(" ").length) {
      handleGameWon();
    }
  };

  const handleGameWon = () => {
    console.log("You won the game!");
    // handle game won logic here
  };

  const handleSelectDifficulty = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
  };

  return (
    <div>
      <div>
        <CountdownTimer />
      </div>
      <div>
        <DifficultySelector onSelectDifficulty={handleSelectDifficulty} />
      </div>
      <div>
        <ImageGenerator
          difficulty={difficulty}
          onGeneratePrompt={handleGeneratePrompt}
        />
      </div>
      <div>
        <PromptDisplay
          prompt={prompt}
          correctWords={correctWords}
          gameWon={handleGameWon}
        />
      </div>
      <div>
        <GuessForm handleGuess={handleGuess} resetForm={resetForm} />
      </div>
      <div
        id="back-box-three"
        className="bg-rose-700 border-2 border-solid border-zinc-900"
      ></div>
    </div>
  );
};

export default Game;
