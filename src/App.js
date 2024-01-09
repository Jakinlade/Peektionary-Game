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
  // State for tracking the correct words guessed by the user
  const [correctWords, setCorrectWords] = useState([]);

  // State for the selected difficulty level
  const [difficulty, setDifficulty] = useState("");

  // State for the current slug (prompt sentence for the image)
  const [slug, setSlug] = useState("");

  // State for the game timer
  const [timer, setTimer] = useState(null); // Timer initialized to null

  // State to track if the game has started
  const [gameStarted, setGameStarted] = useState(false);

  // Effect to generate a new slug whenever the difficulty changes
  useEffect(() => {
    setSlug(SlugGenerator(difficulty));
  }, [difficulty]);

  // Effect for the countdown timer
  useEffect(() => {
    let interval;
    if (gameStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleGameLost();
    }

    return () => clearInterval(interval);
  }, [gameStarted, timer]);

  // Handler for when the game is lost
  const handleGameLost = () => {
    alert("Game Over! Time's up.");
    setGameStarted(false);
  };

  // Handler for when the game is won
  const handleGameWon = () => {
    alert("You won the game!");
    setGameStarted(false);
  };

  // Handler for changing the difficulty level
  const handleSelectDifficulty = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
  };

  // Handler for updating the correct words guessed by the user
  const handleCorrectWords = (newCorrectWords) => {
    setCorrectWords([...correctWords, ...newCorrectWords]);
    if (newCorrectWords.length === slug.split("-").length) {
      handleGameWon();
    }
  };

  // Function to start the game and timer
  const startGame = () => {
    setGameStarted(true);
    setTimer(60); // Start the timer with 60 seconds
  };

  // Function to reduce the timer when a hint is used
  const reduceTimerForHint = () => {
    setTimer((prevTimer) => Math.max(prevTimer - 10, 0));
  };

  return (
    <GameContext.Provider value={{ slug, setSlug }}>
      <div>
        {/* Countdown Timer component, showing the remaining time */}
        <CountdownTimer timeLeft={timer} />
      </div>
      <div>
        {/* Difficulty Selector component */}
        <DifficultySelector onSelectDifficulty={handleSelectDifficulty} />
      </div>
      <div>
        {/* Image Generator component */}
        <ImageGenerator
          difficulty={difficulty}
          onGeneratePrompt={handleCorrectWords}
        />
      </div>
      <div>
        {/* Prompt Display component showing the correct words guessed */}
        <PromptDisplay correctWords={correctWords} />
      </div>
      <div>
        {/* Guess Form component for user to input their guesses */}
        <GuessForm
          correctWords={correctWords}
          setCorrectWords={setCorrectWords}
          handleGameWon={handleGameWon}
        />
      </div>
      <div>
        {/* Hint Button component, reduces timer when used */}
        <HintButton slug={slug} onUseHint={reduceTimerForHint} />
      </div>
      {!gameStarted && <button onClick={startGame}>Start Game</button>}
    </GameContext.Provider>
  );
};

export default Game;
