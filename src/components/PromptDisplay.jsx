import React from "react";

const PromptDisplay = ({ prompt, correctWords, gameWon }) => {
  const words = prompt.split(" ");

  // map each word in the prompt to either the correct word or a blank
  const guessedPrompt = words
    .map((word) => {
      if (correctWords.includes(word)) {
        return word;
      } else {
        return "___";
      }
    })
    .join(" ");

  // map each word in the prompt to either the correct word or an empty string
  const promptSlugDisplay = words
    .map((word) => {
      if (correctWords.includes(word)) {
        return word;
      } else {
        return "";
      }
    })
    .join(" ");

  // check if all the words have been guessed correctly
  if (correctWords.length === words.length) {
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
