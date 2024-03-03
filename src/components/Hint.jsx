import { Configuration, OpenAIApi } from "openai";
import apiKey from "./API"; // Import your OpenAI API key

// Configure the OpenAI API client with your API key
const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

// Function to get a hint based on the provided slug
const getHint = async (slug) => {
  // Check if the API key and slug are provided
  if (!apiKey) {
    throw new Error("API key is missing");
  }
  if (!slug) {
    throw new Error("Slug is missing");
  }

  try {
    // Making a request to OpenAI API to generate a hint for the slug
    // The request uses the GPT-3.5 Turbo model and chat completions endpoint
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-1106",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `Provide a hint about the phrase '${slug}', without revealing it directly.` }
      ]
    });

    // Returning the generated hint, trimmed for extra whitespace
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    // Log and re-throw errors for further handling
    console.error("Error in generating hint:", error);
    throw error;
  }
};

export default getHint;
