import React, { useContext } from "react";
import GameContext from "./GameContext";

const PromptDisplay = ({ correctWords, gameWon }) => {
  const { slug } = useContext(GameContext);
  const words = slug ? slug.split(" ") : [];

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

  const promptSlugDisplay = words
    .map((word) => {
      if (correctWords.includes(word)) {
        return word;
      } else {
        return "______";
      }
    })
    .join("-");

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
