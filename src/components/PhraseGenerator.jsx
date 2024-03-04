import React, { useState, useContext } from "react";
import AIWordGenerator from "./AIWordGenerator";
import SlugGenerator from "./SlugGenerator";
import GameContext from "./GameContext";
import apiKey from "./API";

export const PhraseGenerator = ({ difficulty }) => {
  const { setPhrase, setCurrentGuessState } = useContext(GameContext); // Include setCurrentGuessState in the context
  const [useOpenAI, setUseOpenAI] = useState(false);

  const toggleGenerator = () => {
    setUseOpenAI(!useOpenAI);
  };

  const preprocessPhrase = (phrase) => {
    // Remove punctuation and extra spaces
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
    setPhrase(processedPhrase); // Set the preprocessed phrase
    const initialCurrentGuessState =
      initializeCurrentGuessState(processedPhrase);
    setCurrentGuessState(initialCurrentGuessState); // Initialize currentGuessState with placeholders
  };

  return (
    <div>
      <button
        onClick={toggleGenerator}
        className="text-2xl border-2 border-solid border-zinc-900 flex justify-around p-px bg-gray-300 hover:bg-teal-700 hover:text-white"
        id="phraseBtn"
      >
        {useOpenAI ? "Toggle: AI Phrases" : "Toggle: Basic Phrases"}
      </button>
      <button
        onClick={generatePhrase}
        className="text-2xl border-2 border-solid border-zinc-900 flex justify-around p-px bg-gray-300 hover:bg-teal-700 hover:text-white"
        id="generateBtn"
      >
        Play
      </button>
    </div>
  );
};

export default PhraseGenerator;
