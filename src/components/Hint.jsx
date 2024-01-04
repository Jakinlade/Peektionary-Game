import { Configuration, OpenAIApi } from "openai";
import apiKey from "./API";

// Configuring the OpenAI API with the provided API key
const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

// Asynchronous function to get a hint based on the provided slug
export default async function getHint(slug) {
  // Check if the API key is properly configured
  if (!configuration.apiKey) {
    throw new Error(
      "OpenAI API key not configured, please follow instructions in README.md"
    );
  }

  // Validate the slug before making a request
  if (slug.trim().length === 0) {
    throw new Error("slug not specified");
  }

  // Try block to handle the API request
  try {
    // Making a request to OpenAI API to generate a hint based on the slug
    const completion = await openai.createCompletion({
      model: "text-davinci-003", // Specifies the model used for the completion
      prompt: `Give a hint about what ${slug} is without saying the words ${slug}`, // The prompt sent to OpenAI
      temperature: 0.6, // Controls randomness in the response. Lower is more deterministic.
    });
    return completion.data.choices[0].text; // Returning the generated hint
  } catch (error) {
    // Error handling for issues with the API request
    if (error.response) {
      // Logs the error response from OpenAI if available
      console.error(error.response.status, error.response.data);
      throw new Error(error.response.data); // Throws an error with the response data
    } else {
      // Logs other types of errors
      console.error(`Error with OpenAI API request: ${error.message}`);
      throw new Error("An error occurred during your request."); // Throws a generic error message
    }
  }
}
