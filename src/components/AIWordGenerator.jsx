import { Configuration, OpenAIApi } from "openai";
import { generateSlug } from "random-word-slugs";

const AIWordGenerator = async (difficulty, apiKey) => {
  if (!apiKey) {
    console.warn("AIWordGenerator: OpenAI API key is not set.");
    return "";
  }

  const slug = generateSlug(1, {
    partsOfSpeech: ["noun"],
    categories: {
      noun: ["animals", "food", "place", "sports", "thing", "transportation"],
    },
  });
  console.log("Slug set as food:", { slug });

  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);

  // System message remains the same as you want to keep it general for creative prompts
  const systemMessageContent = `Your task is to generate phrases related to "${slug}" for a guessing game where the player must guess what an image is. Focus on creating visually descriptive and engaging images that vary based on the word's broad category and could reasonably be guessed from what they look like.`;

  let userMessageContent;
  if (difficulty === "easy") {
    userMessageContent = `Give me 1 noun that is similar to the kind of thing that ${slug} is. make it something that could be easily guessed just from seeing the image.`;
  } else if (difficulty === "medium") {
    userMessageContent = `Give me a visually descriptive basic adjective and a noun in the same broad category as ${slug}. Exactly 2 words.`;
  } else {
    // hard
    userMessageContent = `Give me 3 words that are a noun and 2 adjectives to describe it. make them visually descriptive adjectives and a noun in the same broad category as ${slug}. Exactly 3 words in the format "big round dog"`;
  }

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
          content: userMessageContent,
        },
      ],
      max_tokens: 60,
      temperature: 1.0,
    });

    // This logic ensures the response is trimmed to the correct number of words based on difficulty
    const maxWords =
      difficulty === "hard" ? 3 : difficulty === "medium" ? 2 : 1;
    const text = response.data.choices[0].message.content
      .trim()
      .split(" ")
      .slice(0, maxWords)
      .join(" ");
    console.log(`AIWordGenerator: Received generated text: "${text}"`);
    return text;
  } catch (error) {
    console.error(
      "AIWordGenerator: Error generating phrase with OpenAI:",
      error
    );
    return "";
  }
};

export default AIWordGenerator;
