import { Configuration, OpenAIApi } from "openai";
import { useState, useContext } from "react";
import apiKey from "./API";
import GameContext from "./GameContext";

// ImageGenerator component generates an image based on a given slug
function ImageGenerator(props) {
  // Accessing the current slug from GameContext
  const { slug } = useContext(GameContext);

  // Configuring OpenAI API with the provided API key
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);

  // State to store the generated image URL
  const [result, setResult] = useState("");

  // Async function to generate an image using OpenAI's DALL-E model
  const generateImage = async (slug) => {
    console.log(slug); // Log the slug for debugging purposes
    // Request to create an image using the OpenAI API
    const res = await openai.createImage({
      prompt: slug, // The prompt for image generation
      n: 1,         // Number of images to generate
      size: "512x512", // Size of the generated image
    });
    setResult(res.data.data[0].url); // Update the result state with the image URL
  };

  // Render the ImageGenerator component
  return (
    <div>
      {/* Button to trigger image generation */}
      <button
        id="generateBtn"
        onClick={() => generateImage(slug)} // Using the slug from GameContext for image generation
        className="text-2xl border-2 border-solid border-zinc-900 flex justify-around p-px bg-gray-300 hover:bg-teal-700 hover:text-white"
      >
        Generate
      </button>
      {/* Container to display the generated image */}
      <div
        id="image-container"
        className="app-main text-2xl border-2 border-solid border-zinc-900 flex justify-around p-px bg-gray-300"
      >
        <img
          className="object-fill aspect-auto"
          src={result}
          alt="Generated result"
          data-prompt={props.prompt}
        />
      </div>
      {/* Additional layout or decorative element */}
      <div
        id="back-box-two"
        className="bg-blue-700 border-2 border-solid border-zinc-900"
      ></div>
    </div>
  );
}

export default ImageGenerator;
