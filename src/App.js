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

  const handleGenerateClick = () => {
    console.log("Generate button clicked.");
    setTriggerGeneration(true); // This will initiate the phrase generation process
  };

  // Handle hint use
  const handleUseHint = useCallback(() => {
    if (!gameStarted) return;
    setTimer((prevTimer) => Math.max(prevTimer - 10, 0));
  }, [gameStarted]);

  useEffect(() => {
    if (triggerGeneration) {
      if (useOpenAI) {
        // Assuming AIWordGenerator will auto-trigger upon `triggerGeneration` change
      } else {
        const newPhrase = SlugGenerator(difficulty);
        setPhrase(newPhrase);
      }
      setTriggerGeneration(false); // Reset trigger after the phrase is set
    }
  }, [useOpenAI, triggerGeneration, difficulty, setPhrase]);

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
      {!gameStarted && (
        <button
          onClick={handleGenerateClick}
          className="text-2xl border-2 border-solid border-zinc-900 flex justify-around p-px bg-gray-300 hover:bg-teal-700 hover:text-white"
          id="generateBtn"
        >
          Generate
        </button>
      )}
      {useOpenAI && <AIWordGenerator triggerGeneration={triggerGeneration} />}
      <ImageGenerator />
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
