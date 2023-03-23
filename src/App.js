import "./App.css";
import CountdownTimer from "./components/CountdownTimer";
import React, { useState, useEffect } from "react";
import ImageGenerator from "./components/imageGenerator";
import GuessForm from "./components/GuessForm";
import DifficultySelector from "./components/DifficultySelector";
import PromptDisplay from "./components/PromptDisplay";
import SlugGenerator from "./components/SlugGenerator";
import GameContext from "./components/GameContext";
import HintButton from "./components/HintButton";

const Game = () => {
  const [correctWords, setCorrectWords] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    setSlug(SlugGenerator(difficulty));
  }, [difficulty]);

  const handleGameWon = () => {
    alert("You won the game!");
  };

  const handleSelectDifficulty = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
  };

  const handleCorrectWords = (newCorrectWords) => {
    setCorrectWords([...correctWords, ...newCorrectWords]);

    if (newCorrectWords.length === slug.split("-").length) {
      alert("You Win!!");
    }
  };

  return (
    <GameContext.Provider value={{ slug, setSlug }}>
      <div>
        <CountdownTimer />
      </div>
      <div>
        <DifficultySelector onSelectDifficulty={handleSelectDifficulty} />
      </div>
      <div>
        <ImageGenerator
          difficulty={difficulty}
          onGeneratePrompt={handleCorrectWords}
        />
      </div>
      <div>
        <PromptDisplay correctWords={correctWords} />
      </div>
      <div>
        <GuessForm
          correctWords={correctWords}
          setCorrectWords={setCorrectWords}
          handleGameWon={handleGameWon}
        />
      </div>
      <div
        id="back-box-three"
        className="bg-rose-700 border-2 border-solid border-zinc-900"
      ></div>
            <div>
      <HintButton slug={slug} />
      </div>
    </GameContext.Provider>
  );
};

export default Game;