import React, { useContext } from "react";
import GameContext from "./GameContext";

// Functional component for selecting game difficulty
const DifficultySelector = ({ onSelectDifficulty }) => {
  const { gameStarted, difficulty } = useContext(GameContext); // Use `difficulty` from GameContext

  // Function to handle difficulty selection
  const handleDifficultyClick = (selectedDifficulty) => {
    // Call the passed onSelectDifficulty function with the chosen difficulty
    onSelectDifficulty(selectedDifficulty);
    // Log the selected difficulty to the console (useful for debugging)
    console.log("Selected difficulty:", selectedDifficulty);
  };

  // Helper function to determine button className
  const getButtonClass = (buttonDifficulty) => {
    return `hover:font-extrabold ${
      difficulty === buttonDifficulty ? "font-bold" : ""
    }`;
  };

  // Rendering the difficulty selection buttons
  return (
    <div>
      {!gameStarted && (
        <div
          id="select-level"
          className="scale-5 text-xl border-2 border-solid border-zinc-900 flex justify-evenly bg-gray-300"
        >
          <h2>Select difficulty:</h2>
          {/* Buttons for selecting difficulty */}
          <button
            onClick={() => handleDifficultyClick("easy")}
            className={getButtonClass("easy")}
          >
            Easy
          </button>
          <button
            onClick={() => handleDifficultyClick("medium")}
            className={getButtonClass("medium")}
          >
            Medium
          </button>
          <button
            onClick={() => handleDifficultyClick("hard")}
            className={getButtonClass("hard")}
          >
            Hard
          </button>
        </div>
      )}
      {!gameStarted && (
        <div
          id="back-box-one"
          className="bg-red-700 border-2 border-solid border-zinc-900"
        ></div>
      )}
    </div>
  );
};

export default DifficultySelector;
