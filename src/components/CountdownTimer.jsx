import React, { useEffect, useRef } from "react";

const CountdownTimer = ({ gameStarted, timeLeft, setTimeLeft }) => {
  const timeLeftRef = useRef(timeLeft); // useRef to keep track of the current timeLeft

  // Update the ref whenever the timeLeft changes
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  // This effect sets up the interval for the timer countdown
  useEffect(() => {
    console.log("Game started:", gameStarted);
    if (!gameStarted) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [gameStarted, setTimeLeft]);

  // Render the time left
  return (
    <div>
      <div>Time left: {timeLeft}</div>
    </div>
  );
};

export default CountdownTimer;
