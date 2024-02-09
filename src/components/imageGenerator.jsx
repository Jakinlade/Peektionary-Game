import { Configuration, OpenAIApi } from "openai";
import { useState, useContext, useEffect } from "react";
import apiKey from "./API";
import GameContext from "./GameContext";

function ImageGenerator() {
  const { slug, generateSlug } = useContext(GameContext); // Use generateSlug from GameContext

  const [result, setResult] = useState("");

  useEffect(() => {
    // Call generateSlug every time this component is rendered
    generateSlug();
  }, [generateSlug]);

  const generateImage = async () => {
    console.log("Generating image for slug:", slug);
    if (!slug) {
      console.log("No slug provided for image generation");
      return; // Prevent API call if slug is empty
    }

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
    } catch (error) {
      console.error("Error generating image:", error.message || error);
    }
  };

  return (
    <div>
      <button
        id="generateBtn"
        onClick={generateImage}
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
