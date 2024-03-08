import { Configuration, OpenAIApi } from "openai";
import apiKey from "./API"; // Import your OpenAI API key

const getHint = async (phrase, currentGuessState) => {
  if (!apiKey) {
    throw new Error("API key is missing");
  }
  if (!phrase) {
    throw new Error("Phrase is missing");
  }

  // Split the full phrase into words
  const words = phrase.split(" ");

  // Determine which words have been guessed and which haven't
  const guessedWords = [];
  const remainingWords = [];

  words.forEach((word, index) => {
    // If the current guess is the same as the word, it's a correct guess
    if (currentGuessState[index] === word) {
      guessedWords.push(word);
    } else {
      remainingWords.push(word);
    }
  });

  console.log("guessed words =:", { guessedWords });
  console.log("remainig words =:", { remainingWords });

  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);

  // Construct the prompt based on the state of the guesses
  const promptMessage =
    guessedWords.length > 0
      ? `The phrase to guess is '${phrase}'. The player has already guessed the words '${guessedWords.join(
          " "
        )}'. Provide a hint that focuses on the remaining words '${remainingWords.join(
          " "
        )}', without ever using those words in the hint. Give descriptive hints. if '${remainingWords.join(
          " "
        )}' is just one word, maybe give a hint about the first letter of that word, or other similar words, or the kind of word that it is.`
      : `The phrase to guess is '${phrase}', and the player hasn't guessed any words yet. Provide an indirect hint that will help them get started on guessing the phrase.`;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful hint giver in a game. Your role is to provide subtle clues to players trying to guess a phrase based on an image. These clues should be indirect, aiming to guide the player closer to the answer without revealing it directly. Remember, the goal is to aid in the guessing process, not to solve the puzzle for them.",
        },
        {
          role: "user",
          content: promptMessage,
        },
      ],
    });

    // Returning the generated hint, trimmed for extra whitespace
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error in generating hint:", error);
    throw error;
  }
};

export default getHint;
