import React, { useContext } from "react";
import GameContext from "./GameContext";

const PromptDisplay = ({ correctWords, gameWon }) => {
  const { phrase } = useContext(GameContext);
  const words = phrase ? phrase.split(" ") : [];

  // map each word in the prompt to either the correct word or a blank
  const guessedPrompt = words
    .map((word) => {
      if (correctWords.includes(word)) {
        return word;
      } else {
        return "";
      }
    })
    .join(" ");

  const promptPhraseDisplay = words
    .map((word) => {
      if (correctWords.includes(word)) {
        return word;
      } else {
        return "";
      }
    })
    .join("-");

  // check if all the words have been guessed correctly
  // if (correctWords.length === words.length) {
  //   console.log("it's a match");
  // }

  return (
    <div>
      <div>{guessedPrompt}</div>
      <div>{promptPhraseDisplay}</div>
    </div>
  );
};

export default PromptDisplay;
