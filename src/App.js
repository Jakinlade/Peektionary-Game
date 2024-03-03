import React, { useContext, useEffect, useCallback, useState } from "react";
import "./App.css";
import CountdownTimer from "./components/CountdownTimer";
import ImageGenerator from "./components/imageGenerator";
import GuessForm from "./components/GuessForm";
import DifficultySelector from "./components/DifficultySelector";
import GameContext from "./components/GameContext";
import HintButton from "./components/HintButton";
import EndGameModal from "./components/EndGameModal";
import AIWordGenerator from "./components/AIWordGenerator";
import SlugGenerator from "./components/SlugGenerator";

const Game = () => {
  // Utilize useContext to access game state and functions
  const {
    difficulty,
    gameStarted,
    setGameStarted,
    guessedWords,
    setDifficulty,
    generatePhrase,
    toggleGenerator,
    useOpenAI,
    setPhrase,
  } = useContext(GameContext);

  const [showModal, setShowModal] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [timer, setTimer] = React.useState(100);
  const [triggerGeneration, setTriggerGeneration] = useState(false);

  // Adjusted to use context state and functions
  const handleGameEnd = useCallback(
    (won = false) => {
      setGameStarted(false);
      setShowModal(true);
      const difficultyMultiplier =
        difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3;
      setScore(won ? timer * difficultyMultiplier : 0);
    },
    [difficulty, timer, setGameStarted]
  );

  // Handle hint use
  const handleUseHint = useCallback(() => {
    if (!gameStarted) return;
    setTimer((prevTimer) => Math.max(prevTimer - 10, 0));
  }, [gameStarted]);

  useEffect(() => {
    // Trigger AIWordGenerator or SlugGenerator based on useOpenAI state
    if (triggerGeneration) {
      if (useOpenAI) {
        // AIWordGenerator should be triggered here or through its own useEffect based on triggerGeneration
      } else {
        const phrase = SlugGenerator(difficulty);
        setPhrase(phrase);
      }
      setGameStarted(true);
      setTriggerGeneration(false); // Reset trigger after generation
    }
  }, [useOpenAI, triggerGeneration, difficulty, setPhrase, setGameStarted]);

  // Game over condition
  useEffect(() => {
    if (timer === 0 && gameStarted) {
      handleGameEnd(false);
    }
  }, [timer, gameStarted, handleGameEnd]);

  // Game won condition
  useEffect(() => {
    // Simplified to use guessedWords directly
    if (gameStarted && guessedWords.every((word) => word)) {
      handleGameEnd(true);
    }
  }, [guessedWords, gameStarted, handleGameEnd]);

  return (
    <div className="App">
      <EndGameModal
        showModal={showModal}
        setShowModal={setShowModal}
        score={score}
        gameWon={score > 0}
      />
      <CountdownTimer
        gameStarted={gameStarted}
        timeLeft={timer}
        setTimeLeft={setTimer}
      />
      <DifficultySelector onSelectDifficulty={setDifficulty} />
      <ImageGenerator
        onGenerate={generatePhrase}
        onImageReady={() => setGameStarted(true)}
      />
      <GuessForm />
      <HintButton onUseHint={handleUseHint} />
      <button onClick={toggleGenerator}>
        {useOpenAI ? "Use Local Generator" : "Use AI Generator"}
        {useOpenAI && <AIWordGenerator triggerGeneration={triggerGeneration} />}
      </button>
    </div>
  );
};

export default Game;
