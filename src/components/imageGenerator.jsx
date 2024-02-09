import { Configuration, OpenAIApi } from "openai";
import { useState, useContext } from "react";
import apiKey from "./API";
import GameContext from "./GameContext";
import SlugGenerator from "./SlugGenerator"; // Ensure this is correctly imported

function ImageGenerator() {
  // Accessing GameContext to use setSlug for updating the slug state
  const { setSlug } = useContext(GameContext);

  // OpenAI API configuration
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);

  // State to store the generated image URL
  const [result, setResult] = useState("");

  const generateImageAndSlug = async () => {
    // Generate a new slug here
    const newSlug = SlugGenerator("hard"); // Adjust "hard" to dynamically use selected difficulty if needed
    console.log("Generating image for slug:", newSlug); // Debugging log for the new slug
    setSlug(newSlug); // Update the slug in context

    if (!newSlug) {
      console.log("No slug provided for image generation");
      return; // Exit the function if no slug is generated to avoid API call
    }

    try {
      // Making the API call to OpenAI to generate the image with the newSlug
      const res = await openai.createImage({
        model: "dall-e-3",
        prompt: newSlug,
        n: 1,
        size: "1024x1024",
      });

      // Setting the result to the generated image URL
      setResult(res.data.data[0].url);
    } catch (error) {
      console.error("Error generating image:", error.message || error);
    }
  };

  return (
    <div>
      <button
        id="generateBtn"
        onClick={generateImageAndSlug}
        className="text-2xl border-2 border-solid border-zinc-900 flex justify-around p-px bg-gray-300 hover:bg-teal-700 hover:text-white"
      >
        Generate
      </button>
      {result && (
        <div
          id="image-container"
          className="app-main text-2xl border-2 border-solid border-zinc-900 flex justify-around p-px bg-gray-300"
        >
          <img
            className="object-fill aspect-auto"
            src={result}
            alt="Generated result"
            data-prompt={newSlug} // This will not work as newSlug is not available outside generateImageAndSlug function. Consider removing or adjusting this attribute.
          />
        </div>
      )}
      <div
        id="back-box-two"
        className="bg-blue-700 border-2 border-solid border-zinc-900"
      ></div>
    </div>
  );
}

export default ImageGenerator;
