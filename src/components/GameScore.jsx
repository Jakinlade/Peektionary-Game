// Importing React and its hooks
import React, { useState, useEffect } from "react";

/**
 * Score - A React functional component that displays and manages the game score.
 * 
 * Props:
 * - initialScore: The initial score assigned to the user at the start of the game.
 * - hintPenalty: The penalty in score points deducted each time the user uses a hint.
 * - countdownInterval: The time interval (in milliseconds) at which the score decreases automatically.
 */
const Score = ({ initialScore, hintPenalty, countdownInterval }) => {
  // State 'score' holds the current score. It's initialized with 'initialScore'.
  const [score, setScore] = useState(initialScore);

  // useEffect hook to handle the automatic decrement of the score over time.
  useEffect(() => {
    // Creating a timer that updates the score by decrementing it at each interval.
    const timer = setInterval(() => {
      setScore((prevScore) => prevScore - 1);
    }, countdownInterval);

    // Cleanup function to clear the interval timer when the component unmounts.
    return () => clearInterval(timer);
  }, [countdownInterval]); // The effect depends on 'countdownInterval'.

  // Function to handle the score deduction when a hint is used.
  const handleHint = () => {
    setScore((prevScore) => prevScore - hintPenalty);
  };

  // Rendering the score display and the hint button.
  return (
    <div>
      <h2>Score: {score}</h2> {/* Displaying the current score */}
      <button onClick={handleHint}>Use Hint (-{hintPenalty} points)</button> {/* Button to use a hint, showing the penalty */}
    </div>
  );
};

export default Score;
