import { useContext, useState } from "react";
import GameContext from "./GameContext";

export default function Home() {
  const { slug } = useContext(GameContext);
  const [result, setResult] = useState();

  async function handleClick() {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
  return (
    <div>
      <main>
        <button onClick={handleClick}>Guess</button>
        <div>{result}</div>
      </main>
    </div>
  );
}
