import { useState } from "react";

const slug = "rabbit";

function HintButton() {
  const [slugInput, setSlugInput] = useState(slug);
  const [result, setResult] = useState();

  async function handleClick() {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug: slugInput }),
      });
  
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
  
      setResult(data.result);
      setSlugInput("rabbit");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
  return (
    <div >
      <main id="guessBtn" className="text-2xl border-2 border-solid border-zinc-900  flex justify-around p-px bg-gray-300 hover:bg-red-700 hover:text-white">
        <button onClick={handleClick}>Hint</button>
        <div>{result}</div>
      </main>
    </div>
  );
}

export default HintButton;