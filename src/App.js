import "./App.css";
import CountdownTimer from "./components/CountdownTimer";
import React, { useState, useEffect } from "react";
import ImageGenerator from "./components/imageGenerator";
import GuessForm from "./components/GuessForm";
import DifficultySelector from "./components/DifficultySelector";
import PromptDisplay from "./components/PromptDisplay";
import SlugGenerator from "./components/SlugGenerator";

const Game = () => {
  const [correctWords, setCorrectWords] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    setSlug(SlugGenerator(difficulty));
  }, [difficulty]);

  const handleGameWon = () => {
    console.log("You won the game!");
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
          slug={slug}
          onGeneratePrompt={setSlug}
        />
      </div>
      <div>
        <PromptDisplay
          prompt={slug}
          correctWords={correctWords}
          gameWon={handleGameWon}
        />
      </div>
      <div>
        <GuessForm
          prompt={slug}
          correctWords={correctWords}
          setCorrectWords={setCorrectWords}
          handleGameWon={handleGameWon}
          slug={slug}
        />
      </div>
      <div
        id="back-box-three"
        className="bg-rose-700 border-2 border-solid border-zinc-900"
      ></div>
    </div>
  );
};

export default Game;
