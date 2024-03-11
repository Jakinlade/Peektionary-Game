import { useState, useContext, useEffect } from "react";
import GameContext from "./GameContext";
import getHint from "./Hint";

export default function HintButton({ onUseHint }) {
  const [result, setResult] = useState("");
  const { phrase, currentGuessState } = useContext(GameContext); // Use Phrase from context

  useEffect(() => {
    // Reset the result when the Phrase changes
    setResult("");
  }, [phrase]); // Dependency on Phrase ensures effect runs when Phrase updates

  async function handleClick() {
    try {
      if (onUseHint) {
        onUseHint();
      }
      // Pass currentGuessState to getHint function
      const hint = await getHint(phrase, currentGuessState);
      setResult(hint); // Update result with the hint
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  // Render the HintButton and the area to display the result (hint)
  return (
    <div
      
      className="flex justify-center p-2">
      <main>
        {/* Button that triggers the hint request */}
        <button
          onClick={handleClick}
          className="rounded-md bg-sky-100 px-10 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Hint!
        </button>
        {/* Display area for the hint result */}
        <div id="hint-result" className="text-base">
          {result}
        </div>
      </main>
    </div>
  );
}
