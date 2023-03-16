import React, { useState } from "react";

// Define DifficultySelector component that takes onSelectDifficulty function as prop
const DifficultySelector = ({ onSelectDifficulty }) => {
    // Set initial state of selectedDifficulty to 1 using useState hook
    const [selectedDifficulty, setSelectedDifficulty] = useState(1);
  
    // Define handleDifficultyClick function to handle difficulty button clicks
    const handleDifficultyClick = (difficulty) => {
      // Update selectedDifficulty state and call onSelectDifficulty function
      setSelectedDifficulty(difficulty);
      onSelectDifficulty(difficulty);
    };
  
    // Render a div containing a header and buttons for each difficulty level
    return (
      <div class="">
      <div id="select-level" class="text-2xl border-2 border-solid border-zinc-900 max-w-xl flex justify-around p-px bg-gray-300">
        <h2>Select difficulty:</h2>
        <button onClick={() => handleDifficultyClick(1)}>1</button>
        <button onClick={() => handleDifficultyClick(2)}>2</button>
        <button onClick={() => handleDifficultyClick(3)}>3</button>
        <button onClick={() => handleDifficultyClick(4)}>4</button>
        <button onClick={() => handleDifficultyClick(5)}>5</button>
      </div>

      <div id="back-box-one" class="bg-red-700 border-2 border-solid border-zinc-900">

      </div>
      </div>
    );
  };
  
  export default DifficultySelector;