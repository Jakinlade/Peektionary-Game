import { Configuration, OpenAIApi } from "openai";
import { useState, useContext } from "react";
import apiKey from "./API";
import GameContext from "./GameContext";

function ImageGenerator(props) {
  const { slug } = useContext(GameContext); // Get the slug from the GameContext
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);
  const [result, setResult] = useState("");

  const generateImage = async (slug) => {
    console.log(slug);
    const res = await openai.createImage({
      prompt: slug,
      n: 1,
      size: "512x512",
    });
    setResult(res.data.data[0].url);
  };

  return (
    <div>
      <button
        id="generateBtn"
        onClick={() => generateImage(slug)} // Use the slug value from the GameContext
        className="text-2xl border-2 border-solid border-zinc-900  flex justify-around p-px bg-gray-300 hover:bg-teal-700 hover:text-white"
      >
        generate
      </button>
      <div
        id="image-container"
        className="app-main text-2xl border-2 border-solid border-zinc-900 flex justify-around p-px bg-gray-300"
      >
        <img
          className="object-fill aspect-auto"
          src={result}
          alt="result"
          data-prompt={props.prompt}
        />
      </div>
      <div
        id="back-box-two"
        className="bg-blue-700 border-2 border-solid border-zinc-900"
      ></div>
    </div>
  );
}

export default ImageGenerator;
