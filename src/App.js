import React, { useState, useCallback, useEffect } from "react"; // Re-add useEffect for handling timer and game end logic
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

  const handleGameEnd = useCallback(
    (won = false) => {
      setGameStarted(false);
      setShowModal(true);
      const difficultyMultiplier =
        difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3;
      setScore(won ? timer * difficultyMultiplier : 0);
    },
    [difficulty, timer]
  );

  const generateSlug = useCallback(() => {
    const newSlug = SlugGenerator(difficulty);
    setSlug(newSlug);
  }, [difficulty]);

  const handleUseHint = useCallback(() => {
    if (!gameStarted) return;
    setTimer((prevTimer) => Math.max(prevTimer - 10, 0));
  }, [gameStarted]);

  // Check for game over condition (timer reaches 0)
  useEffect(() => {
    if (timer === 0 && gameStarted) {
      handleGameEnd(false); // Game over
    }
  }, [timer, gameStarted, handleGameEnd]);

  // Check for game won condition (all words guessed correctly)
  useEffect(() => {
    const slugWords = slug.split(" ");
    if (
      gameStarted &&
      correctWords.length === slugWords.length &&
      correctWords.every((word) => slugWords.includes(word))
    ) {
      handleGameEnd(true); // Game won
    }
  }, [correctWords, slug, gameStarted, handleGameEnd]);

  return (
    <GameContext.Provider
      value={{
        slug,
        setSlug,
        generateSlug,
        setDifficulty,
        gameStarted,
        setGameStarted,
      }}
    >
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
        onUseHint={handleUseHint}
      />
      <DifficultySelector onSelectDifficulty={setDifficulty} />
      <ImageGenerator
        onGenerate={generateSlug}
        onImageReady={() => setGameStarted(true)}
      />
      <PromptDisplay correctWords={correctWords} />
      <GuessForm
        correctWords={correctWords}
        setCorrectWords={setCorrectWords}
      />
      <HintButton slug={slug} onUseHint={handleUseHint} />
    </GameContext.Provider>
  );
};

export default Game;
