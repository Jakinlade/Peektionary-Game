import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import { imagePrompt } from "./ImagePrompt";
import apiKey  from "./API"

function ImageGenerator() {
  // prop form imageprompt.jsx
  const defaultPrompt = "dog";
  const [prompt] = useState(defaultPrompt);
  const configuration = new Configuration({
    apiKey: apiKey,
  });

  const openai = new OpenAIApi(configuration);
  const [result, setResult] = useState("");

const generateImage = async () => {
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });

    setResult(res.data.data[0].url);
  };

  
  return (
    <div className="app-main">
        <button onClick={generateImage}>generate</button>
          <img className="result-image" src={result} alt="result" />
    </div>
  );
}

export default ImageGenerator;
