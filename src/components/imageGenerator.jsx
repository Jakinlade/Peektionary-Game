import { Configuration, OpenAIApi } from "openai";
import { useState, useContext, useEffect, useCallback } from "react";
import apiKey from "./API";
import GameContext from "./GameContext";
import LoadingImage from "./loading-face.gif"; // Ensure the path is correct

function ImageGenerator() {
  const { phrase, setImageGenerated } = useContext(GameContext);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = useCallback(async () => {
    console.log("Generating image for Phrase:", phrase);
    if (!phrase) {
      console.log("No Phrase provided for image generation");
      return; // Prevent API call if phrase is empty
    }
    setLoading(true);
    const configuration = new Configuration({
      apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);

    try {
      const res = await openai.createImage({
        model: "dall-e-3",
        prompt: phrase,
        n: 1,
        size: "1024x1024",
      });
      setResult(res.data.data[0].url);
      setLoading(false); // Image generation succeeded
      setImageGenerated(true); // Notify that image is generated
    } catch (error) {
      console.error("Error generating image:", error.message || error);
      setLoading(false); // Ensure loading stops if there's an error
    }
  }, [phrase, setImageGenerated]);

  useEffect(() => {
    if (phrase) {
      generateImage();
    } else {
      console.log("Waiting for phrase to be set before generating image...");
    }
  }, [phrase, generateImage]);

  return (
    <div>
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
          <div>Image will appear here.</div>
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
