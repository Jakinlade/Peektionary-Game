import { Configuration, OpenAIApi } from "openai";
import { useState, useEffect } from "react";
import apiKey from "./API";
import { generateSlug } from "random-word-slugs";

function ImageGenerator(props) {
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);
  const [result, setResult] = useState("");

  const generateImage = async (prompt) => {
    let slug;
    if (props.difficulty === "easy") {
      slug = generateSlug(1, {
        format: "title",
        partsOfSpeech: ["noun"],
        categories: {
          adjective: [],
          noun: ["animals", "thing"],
        },
      });
    } else if (props.difficulty === "medium") {
      slug = generateSlug(2, {
        format: "title",
        partsOfSpeech: ["adjective", "noun"],
        categories: {
          adjective: ["color"],
          noun: ["animals", "thing", "transportation"],
        },
      });
    } else {
      slug = generateSlug(3, {
        format: "title",
        partsOfSpeech: ["adjective", "adjective", "noun"],
        categories: {
          adjective: ["color", "size", "shape"],
          noun: [
            "animals",
            "thing",
            "transportation",
            "people",
            "profession",
            "technology",
          ],
        },
      });
    }
    console.log(slug);
    const res = await openai.createImage({
      prompt: prompt + " " + slug,
      n: 1,
      size: "512x512",
    });
    setResult(res.data.data[0].url);
  };

  return (
    <div>
      <button
        id="generateBtn"
        onClick={() => generateImage(props.prompt)}
        className="text-2xl border-2 border-solid border-zinc-900 p-px bg-gray-300"
      >
        generate
      </button>
      <div id="button-bar-box" className="bg-teal-700 border-2 border-solid border-zinc-900"></div>
      <div
        id="image-container"
        className="app-main text-2xl border-2 border-solid border-zinc-900 max-w-xl flex justify-around p-px bg-gray-300"
      >
        <img
          className="object-fill aspect-auto"
          src={result}
          alt="result"
          data-prompt={props.prompt}
        />
      </div>
      <div id="back-box-two" className="bg-blue-700 border-2 border-solid border-zinc-900"></div>
    </div>
  );
}

export default ImageGenerator;
