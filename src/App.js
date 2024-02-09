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
  // State declarations
  const [correctWords, setCorrectWords] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [slug, setSlug] = useState("");
  const [timer, setTimer] = useState(100);
  const [gameStarted, setGameStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);

  // Function to start the game and initialize states
  const startGame = useCallback(() => {
    setGameStarted(true);
    setTimer(100); // Reset timer to initial value
    setShowModal(false); // Ensure modal is not shown at the start
    // Note: Consider setting initial slug or difficulty if needed here
  }, []);

  // Function to handle the game ending
  const handleGameEnd = useCallback((won = false) => {
    setGameStarted(false);
    setShowModal(true);
    const difficultyMultiplier = difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3;
    setScore(timer * difficultyMultiplier);
    // Optionally, perform actions based on whether the game was won or lost
  }, [difficulty, timer]);

  // Adjust timer for hint usage
  const handleUseHint = useCallback(() => {
    setTimer((prevTimer) => Math.max(prevTimer - 10, 0));
  }, []);

  // Slug generation based on game start and difficulty selection
  useEffect(() => {
    if (gameStarted) {
      const generatedSlug = SlugGenerator(difficulty);
      setSlug(generatedSlug);
      // Debugging or error handling for slug generation can be added here
    }
  }, [gameStarted, difficulty]);

  // Handle game loss due to timer running out
  useEffect(() => {
    if (timer === 0) handleGameEnd(false);
  }, [timer, handleGameEnd]);

  // Check for game win condition
  useEffect(() => {
    const slugWords = slug.split(' ');
    if (gameStarted && correctWords.length === slugWords.length && correctWords.every(word => slugWords.includes(word))) {
      handleGameEnd(true); // Game won by guessing all correct words
    }
  }, [correctWords, slug, gameStarted, handleGameEnd]);

  // Main component rendering
  return (
    <GameContext.Provider value={{ slug, setSlug }}>
      <DifficultySelector onSelectDifficulty={setDifficulty} />
      <ImageGenerator difficulty={difficulty} onGeneratePrompt={setCorrectWords} />
      <PromptDisplay correctWords={correctWords} />
      <GuessForm correctWords={correctWords} setCorrectWords={setCorrectWords} />
      <HintButton slug={slug} onUseHint={handleUseHint} />
      <CountdownTimer gameStarted={gameStarted} timeLeft={timer} setTimeLeft={setTimer} onUseHint={handleUseHint} />
      <EndGameModal showModal={showModal} setShowModal={setShowModal} score={score} />
      {!gameStarted && <button onClick={startGame}>Start Game</button>}
      {/* Future components or placeholders */}
    </GameContext.Provider>
  );
};

export default Game;
