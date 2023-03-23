import { Configuration, OpenAIApi } from "openai";
import apiKey from "./API";

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

export default async function getHint(slug) {
  if (!configuration.apiKey) {
    throw new Error(
      "OpenAI API key not configured, please follow instructions in README.md"
    );
  }

  // if (slug.trim().length === 0) {
  //   throw new Error("slug not specified");
  // }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Give a hint about what ${slug} is without saying the words ${slug}`,
      temperature: 0.6,
    });
    return completion.data.choices[0].text;
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      throw new Error(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      throw new Error("An error occurred during your request.");
    }
  }
}