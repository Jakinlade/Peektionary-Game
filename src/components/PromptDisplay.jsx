import React from "react";

const PromptDisplay = ({ prompt, correctWords, gameWon }) => {
  const words = prompt.split(" ");
  const guessedPrompt = words
    .map((word) =>
      correctWords.includes(word) ? word : "___"
    )
    .join(" ");

  const promptSlugDisplay = words
    .map((word) =>
      correctWords.includes(word) ? word : ""
    )
    .join(" ");

  if (guessedPrompt === prompt) {
    gameWon();
  }

  return (
    <div>
      <div>{guessedPrompt}</div>
      <div>{promptSlugDisplay}</div>
    </div>
  );
};

export default PromptDisplay;
