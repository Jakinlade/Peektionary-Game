import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import apiKey from "./API"

function ImageGenerator(props) {
  const [prompt, setPrompt] = useState(props.prompt);
  const configuration = new Configuration({
    apiKey: apiKey,
  });

  const openai = new OpenAIApi(configuration);
  const [result, setResult] = useState("");

  const generateImage = async () => {
    const res = await openai.createImage({
      prompt: prompt, // use the prompt state value
      n: 1,
      size: "512x512",
    });

    setResult(res.data.data[0].url);
  };

  
  return (
    <div>
      <button id="generateBtn" onClick={generateImage} className="text-2xl border-2 border-solid border-zinc-900 p-px bg-gray-300">generate</button>
      <div id="image-container" className="app-main text-2xl border-2 border-solid border-zinc-900 max-w-xl flex justify-around p-px bg-gray-300">
      <img className="object-fill aspect-auto" src={result} alt="result" data-prompt={`${prompt}`} />
      </div>
    </div>
  );
}

export default ImageGenerator;
