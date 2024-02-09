import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import CountdownTimer from "./components/CountdownTimer";
import ImageGenerator from "./components/imageGenerator";
import GuessForm from "./components/GuessForm";
import DifficultySelector from "./components/DifficultySelector";
import PromptDisplay from "./components/PromptDisplay";
import GameContext from "./components/GameContext";
import HintButton from "./components/HintButton";
import SlugGenerator from "./components/SlugGenerator";
import EndGameModal from "./components/EndGameModal";

const Game = () => {
  const [correctWords, setCorrectWords] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [slug, setSlug] = useState("");
  const [timer, setTimer] = useState(100);
  const [gameStarted, setGameStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);

  const handleGameEnd = useCallback((won = false) => {
    setGameStarted(false);
    setShowModal(true);
    const difficultyMultiplier = difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3;
    setScore(timer * difficultyMultiplier);
  }, [difficulty, timer]);

  const startGame = () => {
    setGameStarted(true);
    setTimer(100);
    setShowModal(false);
  };

  const generateSlug = useCallback(() => {
    const newSlug = SlugGenerator(difficulty);
    setSlug(newSlug);
  }, [difficulty]);

  const handleUseHint = useCallback(() => {
    setTimer((prevTimer) => Math.max(prevTimer - 10, 0));
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleGameEnd(false);
    }
  }, [timer, handleGameEnd]);

  useEffect(() => {
    const slugWords = slug.split(' ');
    if (gameStarted && correctWords.length === slugWords.length && correctWords.every(word => slugWords.includes(word))) {
      handleGameEnd(true);
    }
  }, [correctWords, slug, gameStarted, handleGameEnd]);

  return (
    <GameContext.Provider value={{ slug, setSlug, generateSlug, setDifficulty }}>
      <EndGameModal showModal={showModal} setShowModal={setShowModal} score={score} />
      <CountdownTimer gameStarted={gameStarted} timeLeft={timer} setTimeLeft={setTimer} onUseHint={handleUseHint} />
      <DifficultySelector onSelectDifficulty={setDifficulty} />
      <ImageGenerator onGenerate={generateSlug} />
      <PromptDisplay correctWords={correctWords} />
      <GuessForm correctWords={correctWords} setCorrectWords={setCorrectWords} />
      <HintButton slug={slug} onUseHint={handleUseHint} />
      {!gameStarted && <button onClick={startGame}>Start Game</button>}
      {/* The Generate Slug button can be removed if the ImageGenerator component now handles slug generation internally. */}
    </GameContext.Provider>
  );
};

export default Game;
