import react from 'react';
import { generateSlug } from "random-word-slugs";
import DifficultySelector from "./DifficultySelector"

// This needs to wrapped with an if statement based on the difficulty selector function

// EASY LEVEL - just noun
// Easy slug option object
const easySlugOptions = {
  format: "title",
  partsOfSpeech: ["noun"],
  categories: {
    adjective: [],
    noun: ["animals", "thing"],
  },
};
// easy slug being logged
const easySlug = generateSlug(1, easySlugOptions);
console.log(easySlug);

// MEDIUM LEVEL - colour and noun
// medium slug options
const mediumSlugOptions = {
  format: "title",
  partsOfSpeech: ["adjective", "noun"],
  categories: {
    adjective: ["color"],
    noun: ["animals", "thing", "transportation"],
  },
};
// medium slug being logged
const mediumSlug = generateSlug(2, mediumSlugOptions);
console.log(mediumSlug);

// HARD LEVEL - 
// hard slug options
const hardSlugOptions = {
  format: "title",
  partsOfSpeech: ["adjective", "adjective", "noun"],
  categories: {
    adjective: ["color", "size", "shape"],
    noun: ["animals", "thing", "transportation", "people", "profession", "technology"],
  },
};
// medium slug being logged
const hardSlug = generateSlug(3, hardSlugOptions);
console.log(hardSlug);


export default ImagePrompt;