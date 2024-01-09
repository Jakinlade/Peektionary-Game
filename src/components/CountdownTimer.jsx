import React from 'react';

function CountdownTimer({ timeLeft }) {
  // Render the timer in the UI
  return (
    <div className="App">
      <div>Time left: {timeLeft !== null ? timeLeft : "Not started"}</div>
    </div>
  );
}

export default CountdownTimer;
