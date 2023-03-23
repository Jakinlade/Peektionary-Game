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
    <div>
      <main>
        <button onClick={handleClick}>Hint!</button>
        <div>{result}</div>
      </main>
    </div>
  );
}