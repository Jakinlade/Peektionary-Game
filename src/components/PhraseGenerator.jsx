import React, { useContext } from "react";
import AIWordGenerator from "./AIWordGenerator";
import SlugGenerator from "./SlugGenerator";
import GameContext from "./GameContext";
import apiKey from "./API";

export const PhraseGenerator = ({ difficulty }) => {
  const { setPhrase, setCurrentGuessState, useOpenAI, setUseOpenAI } =
    useContext(GameContext);

  const preprocessPhrase = (phrase) => {
    return phrase
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  };

  const initializeCurrentGuessState = (processedPhrase) => {
    return processedPhrase.split(" ").map((word) => "_".repeat(word.length));
  };

  const generatePhrase = async () => {
    let newPhrase = "";
    if (useOpenAI) {
      newPhrase = await AIWordGenerator(difficulty, apiKey);
    } else {
      newPhrase = SlugGenerator(difficulty);
    }
    const processedPhrase = preprocessPhrase(newPhrase);
    setPhrase(processedPhrase);
    const initialCurrentGuessState =
      initializeCurrentGuessState(processedPhrase);
    setCurrentGuessState(initialCurrentGuessState);
  };

  const getGeneratorButtonClass = (isAiGenerator) => {
    return `text-2xl p-2 ${useOpenAI === isAiGenerator ? "font-bold" : ""}`;
  };

  return (
    <div className="">
      <h2>Word Generator:</h2>
      {/* Buttons for selecting the generator type */}
      <button
        onClick={() => setUseOpenAI(true)}
        className={getGeneratorButtonClass(true)}
      >
        AI
      </button>
      <button
        onClick={() => setUseOpenAI(false)}
        className={getGeneratorButtonClass(false)}
      >
        Basic
      </button>
      {/* Play Button remains the same */}
      <button
        onClick={generatePhrase}
        className="flex justify-around p-px text-2xl bg-gray-300 border-2 border-solid border-zinc-900 hover:bg-teal-700 hover:text-white"
        id="generateBtn"
      >
        Play
      </button>
    </div>
  );
};

export default PhraseGenerator;
