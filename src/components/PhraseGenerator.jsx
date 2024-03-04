import React, { useState, useContext } from "react"; // Added to use useState for managing useOpenAI state
import AIWordGenerator from "./AIWordGenerator";
import SlugGenerator from "./SlugGenerator";
import GameContext from "./GameContext"; // Import GameContext to use its state and updater functions

export const PhraseGenerator = ({ difficulty }) => {
  const { setPhrase } = useContext(GameContext);
  const [useOpenAI, setUseOpenAI] = useState(false); // Local state to toggle between AI and local generator

  const toggleGenerator = () => {
    setUseOpenAI(!useOpenAI);
  };

  const generatePhrase = async () => {
    let newPhrase = "";
    if (useOpenAI) {
      newPhrase = await AIWordGenerator(difficulty);
    } else {
      newPhrase = SlugGenerator(difficulty);
    }
    setPhrase(newPhrase);
  };

  return (
    <div>
      <button
        onClick={toggleGenerator}
        className="text-2xl border-2 border-solid border-zinc-900 flex justify-around p-px bg-gray-300 hover:bg-teal-700 hover:text-white"
        id="phraseBtn"
      >
        {useOpenAI ? "Toggle: AI Phrases" : "Toggle: Basic Phrases "}
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
