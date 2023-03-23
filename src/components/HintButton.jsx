import { useState } from "react";
import getHint from "./Hint";

export default function HintButton({ slug }) {
  const [result, setResult] = useState("");

  async function handleClick() {
    try {
      const hint = await getHint(slug);
      setResult(hint);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div id="hint" className="text-base border-2 border-solid border-zinc-900 flex justify-around p-px bg-gray-300">
      <main>
        <button onClick={handleClick} className="text-xl border-2 border-solid border-zinc-900 p-px bg-rose-700 text-white hover:bg-blue-700">Hint!</button>
        <div id="hint-result" className="text-base">{result}</div>
      </main>
    </div>
  );
}