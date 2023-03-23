# Peektionary

### Code repository:
https://github.com/Jakinlade/Peektionary-Game

### Deployed application:
https://peektionary.netlify.app/

## Description

Peektionary is an interactive image guessing game that utilizes openAI's DallE technology. The app generates a random image based on a prompt word, which the user must guess. The game is designed to challenge the user's cognitive abilities and provide a unique experience for interacting with AI-generated images. The app is built using React and styled with Tailwind CSS, and utilizes a random slug generator npm module to generate the prompts for the DallE API. The user can play the game and see their score at the end. Peektionary's objective is to provide a fun and engaging way for users to interact with AI-generated images. In future updates, the app may include features such as using openAI's ChatGPT API for generating hints and difficulty levels that increase the number of words used in the prompt.


## App Screenshot

## Code example

Difficulty mode selector buttons

```js
const DifficultySelector = ({ onSelectDifficulty }) => {
  const handleDifficultyClick = (difficulty) => {
    // setSelectedDifficulty(difficulty);
    onSelectDifficulty(difficulty);
    console.log("Selected difficulty:", difficulty);
  };

  return (
    <div>
      <div
        id="select-level"
        className="scale-5 text-xl border-2 border-solid border-zinc-900 flex justify-evenly bg-gray-300"
      >
        <h2>Select difficulty:</h2>
        <button
          onClick={() => handleDifficultyClick("easy")}
          className="hover:font-extrabold"
        >
          Easy
        </button>
        <button
          onClick={() => handleDifficultyClick("medium")}
          className="hover:font-extrabold"
        >
          Medium
        </button>
        <button
          onClick={() => handleDifficultyClick("hard")}
          className="hover:font-extrabold"
        >
          Hard
        </button>
      </div>
      <div
```

A function that uses a randomly generated slug as the prompt for the openAI image generator API

```js
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
```

## Technologies used

![JavaScript Badge](https://img.shields.io/badge/Language-JavaScript-yellow)
<br>
![HTML Badge](https://img.shields.io/badge/Language-HTML-red)
<br>
![CSS badge](https://img.shields.io/badge/Language-CSS-blue)
<br>
![Tailwind badge](https://img.shields.io/badge/Framework-Tailwind-purple)
<br>
![React badge](https://img.shields.io/badge/Library-React-blue)
<br>
![ChatGPT badge](https://img.shields.io/badge/API-ChatGPT-brightgreen)
<br>
![DallE badge](https://img.shields.io/badge/API-DallE-purple)
<br>
![NPM Package badge](https://img.shields.io/badge/NPM%20Package-Random%20Slug%20Generator-orange)

##Contributors

https://github.com/jaycee808
https://github.com/markmos1991
https://github.com/Jakinlade

## License
### MIT License

Copyright (c) 2023

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
