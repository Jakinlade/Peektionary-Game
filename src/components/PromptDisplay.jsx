import React from "react";

const PromptDisplay = ({ prompt, correctWords, gameWon }) => {
  const words = prompt.split(" ");
  const guessedPrompt = words.map((word) =>
    correctWords.includes(word) ? word : "___"
  ).join(" ");

  if (guessedPrompt === prompt) {
    gameWon();
  }

  return <div>{guessedPrompt}</div>;
};

export default PromptDisplay;