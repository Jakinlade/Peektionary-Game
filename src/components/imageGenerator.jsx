import { Configuration, OpenAIApi } from "openai";
import { useState, useContext, useEffect } from "react";
import apiKey from "./API";
import GameContext from "./GameContext";
import LoadingImage from "./loading-face.gif"; // Ensure the path is correct

function ImageGenerator() {
  const { slug, generateSlug, setGameStarted, gameStarted } =
    useContext(GameContext); // Include setGameStarted in useContext
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateSlug();
  }, [generateSlug]);

  const generateImage = async () => {
    console.log("Generating image for slug:", slug);
    if (!slug) {
      console.log("No slug provided for image generation");
      return; // Prevent API call if slug is empty
    }
    setLoading(true);
    const configuration = new Configuration({
      apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);

    try {
      const res = await openai.createImage({
        model: "dall-e-3",
        prompt: slug,
        n: 1,
        size: "1024x1024",
      });
      setResult(res.data.data[0].url);
      setLoading(false); // Image generation succeeded
      setGameStarted(true); // Start the game after the image has been successfully generated
    } catch (error) {
      console.error("Error generating image:", error.message || error);
      setLoading(false); // Ensure loading stops if there's an error
    }
  };

  return (
    <div>
      {!gameStarted && (
        <button
          id="generateBtn"
          onClick={generateImage}
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
          <img
            className="object-fill aspect-auto"
            src={result}
            alt="Generated result"
          />
        ) : (
          <div>Image will appear here.</div> // Placeholder text or empty div as needed
        )}
      </div>
      <div
        id="back-box-two"
        className="bg-blue-700 border-2 border-solid border-zinc-900"
      ></div>
    </div>
  );
}

export default ImageGenerator;
