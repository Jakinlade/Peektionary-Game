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
  } = useContext(GameContext);

  console.log("Initial States:", {
    difficulty,
    gameStarted,
    currentGuessState,
    imageGenerated,
  });

  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(100);

  console.log("Component States:", { showModal, score, timer });

  const handleGameEnd = useCallback(
    (won = false) => {
      console.log(`Game Ending: ${won ? "Won" : "Lost"}`);
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
    console.log("Hint Used");
    setTimer((prevTimer) => Math.max(prevTimer - 10, 0));
  }, [gameStarted]);

  useEffect(() => {
    console.log("Timer Check:", timer);
    if (timer === 0 && gameStarted) {
      console.log("Timer expired");
      handleGameEnd(false);
    }
  }, [timer, gameStarted, handleGameEnd]);

  useEffect(() => {
    console.log("Image Generated Check:", imageGenerated);
    if (imageGenerated) {
      console.log("Setting game to started");
      setGameStarted(true);
    }
  }, [imageGenerated, setGameStarted]);

  useEffect(() => {
    console.log("Checking win condition", { currentGuessState, gameStarted });
    if (
      gameStarted &&
      currentGuessState.every(
        (word) => word.replace(/_/g, "").trim().length > 0
      )
    ) {
      console.log("All words guessed, game won");
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
