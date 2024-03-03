import React, { useState, useEffect, useContext } from "react";
import GameContext from "./GameContext";
import { Configuration, OpenAIApi } from "openai";

const OpenAIWordGenerator = ({ setSlug }) => {
  const { difficulty } = useContext(GameContext);
  const [apiKey] = useState(process.env.REACT_APP_OPENAI_API_KEY);

  useEffect(() => {
    if (!apiKey) {
      console.warn("OpenAI API key is not set.");
      return;
    }

    const configuration = new Configuration({
      apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);

    const generatePrompt = (difficulty) => {
      switch (difficulty) {
        case "easy":
          return "Give me a noun with no more than 8 characters.";
        case "medium":
          return "Give me an adjective and a noun with no more than 8 characters each";
        case "hard":
          return "Give me a noun with two adjectives, each word should have no more than 8 characters.";
        default:
          return "Give me a noun with no more than 8 characters.";
      }
    };

    const getWords = async () => {
      const prompt = generatePrompt(difficulty);
      try {
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 10,
          temperature: 0.7,
        });
        // Extracting the response based on the difficulty level
        const text = response.data.choices[0].text.trim();
        let words = text
          .split("\n")
          .map((line) => line.split(": ")[1])
          .filter(Boolean);

        if (difficulty === "medium" && words.length === 2) {
          // Join adjective and noun for medium difficulty
          setSlug(words.join(" "));
        } else if (difficulty === "hard" && words.length === 3) {
          // Join two adjectives and noun for hard difficulty
          setSlug(words.join(" "));
        } else {
          // Use the noun directly for easy difficulty
          setSlug(words[0]);
        }
      } catch (error) {
        console.error("Error in generating words from OpenAI:", error);
      }
    };

    getWords();
  }, [difficulty, apiKey, setSlug]);

  return null; // This component does not render anything
};

export default OpenAIWordGenerator;
