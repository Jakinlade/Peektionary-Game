import { Configuration, OpenAIApi } from "openai";
import { useState, useContext } from "react";
import apiKey from "./API"; // Ensure this path is correct
import GameContext from "./GameContext";
import LoadingImage from "./loading-face.gif"; // Adjust the path as necessary

function ImageGenerator({ onImageReady }) {
  const { slug, gameStarted } = useContext(GameContext);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
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
      setResult(response.data.choices[0].image_url); // Adjust according to actual API response
      setLoading(false);
      onImageReady(); // Notify the parent component that the image is ready and loaded
    } catch (error) {
      console.error("Error generating image:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="loading-screen">
          <img src={LoadingImage} alt="Loading..." />
        </div>
      ) : result ? (
        <div id="image-container" className="image-container">
          <img src={result} alt="Generated content" />
        </div>
      ) : !gameStarted && ( // Only show the Generate button if the game has not started
        <button onClick={generateImage} className="generate-button">
          Generate
        </button>
      )}
    </div>
  );
}

export default ImageGenerator;
