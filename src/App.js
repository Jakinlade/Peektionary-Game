import React, { useContext, useEffect, useCallback, useState } from "react";
import "./App.css";
import CountdownTimer from "./components/CountdownTimer";
import ImageGenerator from "./components/imageGenerator";
import GuessForm from "./components/GuessForm";
import DifficultySelector from "./components/DifficultySelector";
import GameContext from "./components/GameContext";
import HintButton from "./components/HintButton";
import EndGameModal from "./components/EndGameModal";
import PhraseGenerator from "./components/PhraseGenerator"; // Corrected import

const Game = () => {
  const {
    difficulty,
    gameStarted,
    setGameStarted,
    currentGuessState,
    setDifficulty,

    imageGenerated,
    setImageGenerated,
  } = useContext(GameContext);

  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(100);

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

  const handleUseHint = useCallback(() => {
    if (!gameStarted) return;
    setTimer((prevTimer) => Math.max(prevTimer - 10, 0));
  }, [gameStarted]);

  useEffect(() => {
    if (timer === 0 && gameStarted) {
      handleGameEnd(false);
    }
  }, [timer, gameStarted, handleGameEnd]);

  useEffect(() => {
    if (imageGenerated) {
      setGameStarted(true);
    }
  }, [imageGenerated, setGameStarted, setImageGenerated]);

  useEffect(() => {
    if (gameStarted && currentGuessState.every((word) => word)) {
      handleGameEnd(true);
    }
  }, [currentGuessState, gameStarted, handleGameEnd]);

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
      {!gameStarted && <PhraseGenerator difficulty={difficulty} />}
      <ImageGenerator />
      <GuessForm />
      <HintButton onUseHint={handleUseHint} />
    </div>
  );
};

export default Game;
