import React, { useContext, useEffect } from "react";
import GameContext from "./GameContext";
import AIWordGeneratorFunction from "./AIWordGeneratorFunction"; // Adjust as necessary
import SlugGenerator from "./SlugGenerator"; // Consider renaming this to align with the new terminology

const PhraseGeneratorToggle = () => {
  const { useOpenAI, difficulty, setSlug: setPhrase } = useContext(GameContext);

  useEffect(() => {
    const generatePhrase = async () => {
      let phrase;
      if (useOpenAI) {
        // Assuming AIWordGeneratorFunction returns a promise resolving to a phrase
        phrase = await AIWordGeneratorFunction(difficulty);
      } else {
        // SlugGenerator (or your local phrase generator) is assumed to be synchronous and returns a phrase directly
        phrase = SlugGenerator(difficulty); // Consider renaming SlugGenerator to reflect it generates phrases
      }
      setPhrase(phrase);
    };

    generatePhrase();
  }, [useOpenAI, difficulty, setPhrase]);

  // This component does not render anything itself
  return null;
};

export default PhraseGeneratorToggle;
