import { useEffect, useContext } from "react";
import GameContext from "./GameContext";
import { Configuration, OpenAIApi } from "openai";

const AIWordGenerator = ({ triggerGeneration }) => {
  const { difficulty, setSlug } = useContext(GameContext);
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  useEffect(() => {
    // Function to interact with the OpenAI API
    async function generateSlug() {
      if (!apiKey) {
        console.warn("OpenAI API key is not set.");
        return;
      }

      const configuration = new Configuration({ apiKey });
      const openai = new OpenAIApi(configuration);

      // Generate the prompt based on the difficulty
      const prompt =
        {
          easy: "Give me a simple, easy to guess noun.",
          medium: "Provide a medium complexity noun.",
          hard: "Give me a complex noun with adjectives.",
        }[difficulty] || "Give me a noun.";

      try {
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt,
          max_tokens: 60,
          temperature: 0.5,
        });
        const text = response.data.choices[0].text.trim();
        setSlug(text); // Update the slug in GameContext
      } catch (error) {
        console.error("Error generating slug with OpenAI:", error);
      }
    }

    if (triggerGeneration) generateSlug();
  }, [triggerGeneration, difficulty, apiKey, setSlug]);

  return null; // This component does not render anything
};

export default AIWordGenerator;
