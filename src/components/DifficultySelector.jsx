import React, { useState } from "react";

const DifficultySelector = ({ onSelectDifficulty }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

  const handleDifficultyClick = (difficulty) => {
    // setSelectedDifficulty(difficulty);
    onSelectDifficulty(difficulty);
    console.log("Selected difficulty:", difficulty);
  };

  return (
    <div>
      <div
        id="select-level"
        className="scale-5 text-xl border-2 border-solid border-zinc-900 flex justify-evenly bg-gray-300"
      >
        <h2>Select difficulty:</h2>
        <button
          onClick={() => handleDifficultyClick("easy")}
          className="hover:font-extrabold"
        >
          Easy
        </button>
        <button
          onClick={() => handleDifficultyClick("medium")}
          className="hover:font-extrabold"
        >
          Medium
        </button>
        <button
          onClick={() => handleDifficultyClick("hard")}
          className="hover:font-extrabold"
        >
          Hard
        </button>
      </div>
        <div id="back-box-one" className="bg-red-700 border-2 border-solid border-zinc-900">
        </div>
    </div>
  );
};

export default DifficultySelector;
