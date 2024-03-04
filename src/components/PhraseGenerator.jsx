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
      <button onClick={generatePhrase}>Generate Phrase</button>
      <button onClick={toggleGenerator}>
        {useOpenAI ? "Use Local Generator" : "Use AI Generator"}
      </button>
    </div>
  );
};

export default PhraseGenerator;
