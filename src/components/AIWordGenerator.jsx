import { useEffect, useContext } from "react";
import GameContext from "./GameContext";
import { Configuration, OpenAIApi } from "openai";

const AIWordGenerator = ({ triggerGeneration }) => {
  const { difficulty, setPhrase } = useContext(GameContext);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    console.log(
      `AIWordGenerator: Trigger generation is ${
        triggerGeneration ? "on" : "off"
      }.`
    );

    // Function to interact with the OpenAI API
    async function generateSlug() {
      console.log("AIWordGenerator: Starting slug generation...");
      if (!apiKey) {
        console.warn("AIWordGenerator: OpenAI API key is not set.");
        return;
      }

      const configuration = new Configuration({ apiKey });
      const openai = new OpenAIApi(configuration);

      // Generate the prompt based on the difficulty
      const prompt = "happy";
      // {
      //   easy: "Give me a simple, easy to guess noun.",
      //   medium: "Provide a medium complexity noun.",
      //   hard: "Give me a complex noun with adjectives.",
      // }[difficulty] || "Give me a noun.";

      console.log(
        `AIWordGenerator: Generating with prompt: "${prompt}" for difficulty: ${difficulty}`
      );

      try {
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt,
          max_tokens: 60,
          temperature: 0.5,
        });
        const text = response.data.choices[0].text.trim();
        console.log(`AIWordGenerator: Received generated text: "${text}"`);
        setPhrase(text); // Update the Phrase in GameContext
      } catch (error) {
        console.error(
          "AIWordGenerator: Error generating Phrase with OpenAI:",
          error
        );
      }
    }

    if (triggerGeneration) {
      console.log(
        "AIWordGenerator: Trigger generation is active. Generating slug..."
      );
      generateSlug();
    }
  }, [triggerGeneration, difficulty, apiKey, setPhrase]);

  return null; // This component does not render anything
};

export default AIWordGenerator;
