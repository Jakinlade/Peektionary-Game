import { Configuration, OpenAIApi } from "openai";

const AIWordGenerator = async (difficulty, apiKey) => {
  if (!apiKey) {
    console.warn("AIWordGenerator: OpenAI API key is not set.");
    return "";
  }

  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);

  const systemMessageContent =
    "You are a creative assistant. Your task is to generate unique and diverse phrases for a guessing game where players guess the prompt from images. Aim for variety and avoid repetition to keep the game interesting. The adjectives you use should be visually descriptive";

  const userMessageContent = {
    easy: "Suggest a unique and simple noun that is easy to visualize and can be drawn in many different ways.",
    medium:
      "Come up with an unusual adjective-noun combination that is quirky and unexpected.",
    hard: "Create an imaginative phrase with two adjectives and a noun that would make for a surprising and amusing image. Keep each word under 8 characters.",
  };

  const prompt = userMessageContent[difficulty] || userMessageContent.easy;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0125",
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
    return text;
  } catch (error) {
    console.error("AIWordGenerator: Error generating slug with OpenAI:", error);
    return "";
  }
};

export default AIWordGenerator;
