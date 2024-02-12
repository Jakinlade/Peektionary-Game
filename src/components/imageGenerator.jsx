import { Configuration, OpenAIApi } from "openai";
import { useState, useContext } from "react";
import apiKey from "./API"; // Ensure this path is correct
import GameContext from "./GameContext";
import LoadingImage from "./loading-face.gif"; // Adjust the path as necessary

function ImageGenerator({ onImageReady }) {
  const { slug, gameStarted } = useContext(GameContext);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async (slug) => {
    setLoading(true);
    const configuration = new Configuration({ apiKey: apiKey });
    const openai = new OpenAIApi(configuration);

    try {
      const response = await openai.createImage({
        model: "text-davinci-003", // Adjust the model as necessary
        prompt: slug,
        n: 1,
        size: "1024x1024",
      });
      setResult(response.data.choices[0].image_url); // Ensure this matches the API's response format
      setLoading(false);
      onImageReady(); // This could be where you setGameStarted(true) if that's still needed
    } catch (error) {
      console.error("Error generating image:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      {!gameStarted && (
        <button
          id="generateBtn"
          onClick={() => generateImage(slug)}
          className="text-2xl border-2 border-solid border-zinc-900 flex justify-around p-px bg-gray-300 hover:bg-teal-700 hover:text-white"
        >
          Generate
        </button>
      )}
      <div
        id="image-container"
        className="app-main text-2xl border-2 border-solid border-zinc-900 flex justify-around p-px bg-gray-300"
      >
        {loading ? (
          <img src={LoadingImage} alt="Loading..." />
        ) : result ? (
          <img className="object-fill aspect-auto" src={result} alt="Generated result" />
        ) : (
          <div>Image will appear here.</div> // Optional placeholder text
        )}
      </div>
      <div id="back-box-two" className="bg-blue-700 border-2 border-solid border-zinc-900"></div>
    </div>
  );
}

export default ImageGenerator;
