import React from "react";

// Functional component for selecting game difficulty
const DifficultySelector = ({ onSelectDifficulty }) => {
  // Function to handle difficulty selection
  const handleDifficultyClick = (difficulty) => {
    // Call the passed onSelectDifficulty function with the chosen difficulty
    onSelectDifficulty(difficulty);
    // Log the selected difficulty to the console (useful for debugging)
    console.log("Selected difficulty:", difficulty);
  };

  // Rendering the difficulty selection buttons
  return (
    <div>
      <div
        id="select-level"
        // Styling for the difficulty selection container
        className="scale-5 text-xl border-2 border-solid border-zinc-900 flex justify-evenly bg-gray-300"
      >
        <h2>Select difficulty:</h2>
        {/* Button for selecting 'Easy' difficulty */}
        <button
          onClick={() => handleDifficultyClick("easy")}
          className="hover:font-extrabold"
        >
          Easy
        </button>
        {/* Button for selecting 'Medium' difficulty */}
        <button
          onClick={() => handleDifficultyClick("medium")}
          className="hover:font-extrabold"
        >
          Medium
        </button>
        {/* Button for selecting 'Hard' difficulty */}
        <button
          onClick={() => handleDifficultyClick("hard")}
          className="hover:font-extrabold"
        >
          Hard
        </button>
      </div>
      {/* Additional decorative or layout element */}
      <div
        id="back-box-one"
        className="bg-red-700 border-2 border-solid border-zinc-900"
      ></div>
    </div>
  );
};

export default DifficultySelector;

