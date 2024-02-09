import React, { useEffect } from "react";

const CountdownTimer = ({ gameStarted, setGameStarted, timeLeft, setTimeLeft, onUseHint }) => {
  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
      if (timeLeft <= 0) {
        clearInterval(interval);
        setGameStarted(false); // Handle game end due to timer running out
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [gameStarted, timeLeft, setTimeLeft, setGameStarted]);

  // Expose the reduceTimerForHint function via onUseHint prop
  useEffect(() => {
    onUseHint(() => reduceTimerForHint());
  }, [onUseHint]); // Ensure this runs only when onUseHint changes

  // Function to reduce timer for hint
  const reduceTimerForHint = () => setTimeLeft((prevTime) => Math.max(prevTime - 10, 0));

  return <div>Time left: {timeLeft}</div>;
};

export default CountdownTimer;
