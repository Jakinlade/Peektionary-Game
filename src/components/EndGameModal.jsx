import React from "react";

// ModalComponent to display game end message and score
const ModalComponent = ({ showModal, setShowModal, score }) => {
  if (!showModal) return null;

  // Message based on score could be more dynamic or tailored
  const message = score > 0 ? "Congratulations! You've won the game!" : "Game Over! Time's up.";

  return (
    <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "#fff", padding: "20px", zIndex: 1000 }}>
      <h2>{message}</h2>
      <p>Score: {score}</p> {/* Displaying the score */}
      <button onClick={() => setShowModal(false)}>Close</button>
    </div>
  );
};

export default ModalComponent;
