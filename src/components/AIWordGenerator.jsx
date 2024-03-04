import { useEffect, useContext } from "react";
import GameContext from "./GameContext";
import { Configuration, OpenAIApi } from "openai";

const AIWordGenerator = ({ triggerGeneration }) => {
  const { difficulty, setPhrase, setTriggerGeneration } =
    useContext(GameContext);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    let isCancelled = false; // Flag to indicate if the effect has been cleaned up

    console.log(
      `AIWordGenerator: Trigger generation is ${
        triggerGeneration ? "on" : "off"
      }.`
    );

    async function generateSlug() {
      console.log("AIWordGenerator: Starting slug generation...");
      if (!apiKey) {
        console.warn("AIWordGenerator: OpenAI API key is not set.");
        return;
      }

      const configuration = new Configuration({ apiKey });
      const openai = new OpenAIApi(configuration);

      const systemMessageContent =
        "You are a helpful assistant who is generating words to be used to generate images for an image guessing game. The images should be interesting and the user should be able to guess what they are.";

      const userMessageContent = {
        easy: "Give me a simple, easy-to-guess noun.",
        medium: "Provide a medium complexity adjective followed by a noun.",
        hard: "Give me a complex phrase with two adjectives followed by a noun.",
      };

      const prompt = userMessageContent[difficulty] || userMessageContent.easy;

      try {
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo-1106",
          messages: [
            {
              role: "system",
              content: systemMessageContent,
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 60,
          temperature: 0.5,
        });
        const text = response.data.choices[0].message.content.trim();
        console.log(`AIWordGenerator: Received generated text: "${text}"`);

        if (!isCancelled) {
          setPhrase(text);
          setTriggerGeneration(false); // Reset trigger after the phrase is set
        }
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

    return () => {
      isCancelled = true; // Set the flag on cleanup
    };
  }, [triggerGeneration, difficulty, apiKey, setPhrase, setTriggerGeneration]);

  return null; // This component does not render anything
};

export default AIWordGenerator;
