import React, { useEffect } from "react";

function CountdownTimer({ gameStarted, setGameStarted, setTimeLeft, timeLeft }) {
  useEffect(() => {
    let interval;
    if (gameStarted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setGameStarted(false);
      // Placeholder for modal pop-up
      // TODO: Implement showScoreModal() to display the player's score
      // showScoreModal();
    }

    return () => clearInterval(interval);
  }, [gameStarted, timeLeft, setGameStarted, setTimeLeft]);

  // Expose the function to reduce time for a hint
  const reduceTimeForHint = () => {
    setTimeLeft((prevTime) => Math.max(prevTime - 10, 0));
  };

  // Render the timer
  return (
    <div className="countdown-timer">
      Time left: {timeLeft}
    </div>
  );
}

export default CountdownTimer;
