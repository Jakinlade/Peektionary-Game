import React, { useEffect, useRef } from 'react';

const CountdownTimer = ({ gameStarted, timeLeft, setTimeLeft, onUseHint }) => {
  // useRef to persist the function without having to include it in dependency arrays
  const reduceTimerForHintRef = useRef();

  // This effect sets up the interval for the timer countdown
  useEffect(() => {
    console.log("Game started:", gameStarted); // Add this line
    if (!gameStarted) {
      return;
    }

    // When the game starts, we set up a timer that decreases every second
    const interval = setInterval(() => {
      console.log("Countdown tick"); // Add this line
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(interval);
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [gameStarted, setTimeLeft]);

  // Initializes the ref with the reduceTimerForHint function
  useEffect(() => {
    // This function will be called when the hint is used
    reduceTimerForHintRef.current = () => {
      setTimeLeft(prevTime => Math.max(prevTime - 10, 0));
    };
  }, [setTimeLeft]);

  // Expose the reduceTimerForHint function via onUseHint prop
  useEffect(() => {
    // When the hint is used, we call the current reference of reduceTimerForHint
    onUseHint(() => {
      if (reduceTimerForHintRef.current) {
        reduceTimerForHintRef.current();
      }
    });
  }, [onUseHint]);

  // Render the time left
  return (
    <div>
      Time left: {timeLeft}
    </div>
  );
};

export default CountdownTimer;
