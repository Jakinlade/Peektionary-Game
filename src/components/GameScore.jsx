// A React component to display and update the user's score

import React, { useState, useEffect } from "react";

// Props:
// - initialScore: the starting score for the user
// - hintPenalty: the amount of points to deduct for each hint used
// - countdownInterval: the interval (in milliseconds) for the score to countdown

const Score = ({ initialScore, hintPenalty, countdownInterval }) => {
  // Initialize score state with the initial score
  const [score, setScore] = useState(initialScore);

  // Set up an effect to update the score every interval
  useEffect(() => {
    // Set up a timer that decrements the score by 1 every interval
    const timer = setInterval(() => {
      setScore((prevScore) => prevScore - 1);
    }, countdownInterval);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, [countdownInterval]);

  // A handler function to deduct points for using a hint
  const handleHint = () => {
    setScore((prevScore) => prevScore - hintPenalty);
  };

  // Render the score and a button to use a hint
  return (
    <div>
      <h2>Score: {score}</h2>
      <button onClick={handleHint}>Use Hint (-{hintPenalty} points)</button>
    </div>
  );
};

export default Score;