import { Configuration, OpenAIApi } from "openai";
import apiKey from "./API"; // Import your OpenAI API key

// Configure the OpenAI API client with your API key
const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

// Function to get a hint based on the provided slug and guessed words
const getHint = async (slug, guessedWords) => {
  // Check if the API key and slug are provided
  if (!apiKey) {
    throw new Error("API key is missing");
  }
  if (!slug) {
    throw new Error("Slug is missing");
  }
  if (!guessedWords) {
    throw new Error("Guessed words array is missing");
  }

  // Preparing a hint request context that acknowledges the words already guessed
  let guessedWordsContext =
    guessedWords.length > 0
      ? `The words ${guessedWords.join(", ")} have already been guessed.`
      : "No words have been guessed yet.";

  try {
    // Making a request to OpenAI API to generate a hint for the slug, considering the guessed words
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          role: "system",
          content:
            "You are a hint generator for a game where the user must guess what an image is. " +
            guessedWordsContext +
            "the words phrases will either be 1 word which will be a noun, 2 words which will be an adjective then a noun or 3 words which will be 2 adjectives then a noun",
        },
        {
          role: "user",
          content: `Provide a hint about the phrase '${slug}', focusing on the parts not yet guessed, without revealing the phrase directly. DO NOT use the words in the phrase '${slug}'. Can you give me an indirect clue about the remaining words without giving them away? DO NOT say things like "Certainly! Here's a hint that focuses on the remaining words:" instead, just go straight to the clue/hint`,
        },
      ],
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
