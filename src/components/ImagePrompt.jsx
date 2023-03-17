import React, { useState } from "react";
import DifficultySelector from "./DifficultySelector";
import { generateSlug } from "random-word-slugs";
import ImageGenerator from "./imageGenerator";

const ImagePrompt = () => {
  const [difficulty, setDifficulty] = useState("easy");

  const handleSelectDifficulty = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
  };

  let slug;

  if (difficulty === "easy") {
    slug = generateSlug(1, {
      format: "title",
      partsOfSpeech: ["noun"],
      categories: {
        adjective: [],
        noun: ["animals", "thing"],
      },
    });
  } else if (difficulty === "medium") {
    slug = generateSlug(2, {
      format: "title",
      partsOfSpeech: ["adjective", "noun"],
      categories: {
        adjective: ["color"],
        noun: ["animals", "thing", "transportation"],
      },
    });
  } else if (difficulty === "hard") {
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

  return <ImageGenerator prompt={slug} />;
};

export default ImagePrompt;
