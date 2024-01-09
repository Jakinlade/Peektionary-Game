import { useState } from "react";
import getHint from "./Hint";

// HintButton component is responsible for handling hint requests and displaying the results
export default function HintButton({ slug, onUseHint }) {
  // State 'result' to store the hint received from the getHint function
  const [result, setResult] = useState("");

  // Asynchronous function to handle click events on the hint button
  async function handleClick() {
    try {
      // Requesting a hint using the getHint function with the current slug
      const hint = await getHint(slug);
      // Updating the 'result' state with the received hint
      setResult(hint);
      // Call the onUseHint function to reduce the timer
      onUseHint();
    } catch (error) {
      // Logging any errors to the console and displaying them to the user
      console.error(error);
      alert(error.message);
    }
  }

  // Render the HintButton and the area to display the result (hint)
  return (
    <div id="hint" className="text-base border-2 border-solid border-zinc-900 flex justify-around p-px bg-gray-300">
      <main>
        {/* Button that triggers the hint request */}
        <button onClick={handleClick} className="text-xl border-2 border-solid border-zinc-900 p-px bg-rose-700 text-white hover:bg-blue-700">Hint!</button>
        {/* Display area for the hint result */}
        <div id="hint-result" className="text-base">{result}</div>
      </main>
    </div>
  );
}
