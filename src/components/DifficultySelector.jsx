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
      <div id="select-level" className="text-2xl border-2 border-solid border-zinc-900 flex justify-evenly bg-gray-300">
        <h2>Select difficulty:</h2>
        <button onClick={() => handleDifficultyClick("easy")}>Easy</button>
        <button onClick={() => handleDifficultyClick("medium")}>Medium</button>
        <button onClick={() => handleDifficultyClick("hard")}>Hard</button>
      </div>
        <div id="back-box-one" class="bg-red-700 border-2 border-solid border-zinc-900">
        </div>
    </div>
  );
};

export default DifficultySelector;
