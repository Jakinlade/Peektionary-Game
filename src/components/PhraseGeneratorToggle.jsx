import React, { useContext, useEffect } from "react";
import GameContext from "./GameContext";
import AIWordGeneratorFunction from "./AIWordGeneratorFunction"; // Adjust as necessary
import SlugGenerator from "./SlugGenerator"; // Consider renaming this to align with the new terminology

const phraseGeneratorToggle = () => {
  const {
    useOpenAI,
    difficulty,
    setPhrase: setPhrase,
  } = useContext(GameContext);

  useEffect(() => {
    const generateSlug = async () => {
      let phrase;
      if (useOpenAI) {
        // Assuming AIWordGeneratorFunction returns a promise resolving to a phrase
        phrase = await AIWordGeneratorFunction(difficulty);
      } else {
        // SlugGenerator  is assumed to be synchronous and returns a phrase directly
        phrase = SlugGenerator(difficulty);
      }
      setPhrase(phrase);
    };

    generateSlug();
  }, [useOpenAI, difficulty, setPhrase]);

  // This component does not render anything itself
  return null;
};

export default phraseGeneratorToggle;
