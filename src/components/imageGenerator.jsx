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

  // Function to generate an image based on the slug
  const generateImage = async (slug) => {
    console.log(slug); // Log the slug for debugging purposes
    try {
      // Making the API call to OpenAI to generate the image
      // Using DALL-E 3 model with supported image size
      const res = await openai.createImage({
        model: "dall-e-3", // Specifying to use DALL-E 3 model
        prompt: slug, // The slug acts as the prompt for the image generation
        n: 1, // Number of images to generate (currently DALL-E 3 supports only 1)
        size: "1024x1024", // Supported image size for DALL-E 3
      });
      // Setting the result to the generated image URL
      setResult(res.data.data[0].url);
    } catch (error) {
      // Logging any errors that occur during the API call
      console.error("Error generating image:", error);
    }

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

      {/* Container to display the generated images */}

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
