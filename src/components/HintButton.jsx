import { useState, useContext, useEffect } from "react";
import GameContext from "./GameContext";
import getHint from "./Hint";

export default function HintButton({ onUseHint }) {
  const [result, setResult] = useState("");
  const { slug } = useContext(GameContext); // Use slug from context

  useEffect(() => {
    // Reset the result when the slug changes
    setResult("");
  }, [slug]); // Dependency on slug ensures effect runs when slug updates

  async function handleClick() {
    try {
      // Call onUseHint if it's defined
      if (onUseHint) {
        onUseHint();
      }
      const hint = await getHint(slug); // Use current slug from context
      setResult(hint); // Update result with the hint
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  // Render the HintButton and the area to display the result (hint)
  return (
    <div
      id="hint"
      className="text-base border-2 border-solid border-zinc-900 flex justify-around p-px bg-gray-300"
    >
      <main>
        {/* Button that triggers the hint request */}
        <button
          onClick={handleClick}
          className="text-xl border-2 border-solid border-zinc-900 p-px bg-rose-700 text-white hover:bg-blue-700"
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
