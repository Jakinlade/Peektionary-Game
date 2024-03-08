import React from "react";

// ModalComponent to display game end message and score
const ModalComponent = ({ showModal, setShowModal, score, correctPhrase }) => {
  if (!showModal) return null;

  // Message based on score could be more dynamic or tailored
  const message =
    score > 0
      ? "Congratulations! You've won the game!"
      : `Game Over! The correct phrase was: "${correctPhrase}"`;

  return (
    <div id="endGameModal">
      <h2>{message}</h2>
      <p>Score: {score}</p> {/* Displaying the score */}
      <button onClick={() => setShowModal(false)}>Close</button>
    </div>
  );
};

export default ModalComponent;
