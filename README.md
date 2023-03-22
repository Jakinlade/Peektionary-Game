# Peektionary

### Code repository:


### Deployed application:


## Description


## App Screenshot

## Code example

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
