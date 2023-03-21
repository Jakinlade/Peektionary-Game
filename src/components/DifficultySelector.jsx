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
      <div>
        <h2>Select difficulty:</h2>
        <button onClick={() => handleDifficultyClick("easy")}>Easy</button>
        <button onClick={() => handleDifficultyClick("medium")}>Medium</button>
        <button onClick={() => handleDifficultyClick("hard")}>Hard</button>
      </div>
    </div>
  );
};

export default DifficultySelector;
