import { useState } from "react";

const slug = "rabbit";

export default function Home() {
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
    <div>
      <main>
        <button onClick={handleClick}>Guess</button>
        <div>{result}</div>
      </main>
    </div>
  );
}
