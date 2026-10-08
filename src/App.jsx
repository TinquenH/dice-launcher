import { useState } from "react";
import { rollDice } from "./lib/dice.js";

const DICE = [4, 6, 8, 10, 12, 20, 100];

export default function App() {
  const [result, setResult] = useState(null);

  const handleRoll = (sides) => {
    setResult({ sides, ...rollDice(1, sides) });
  };

  return (
    <main>
      <h1>Dice Launcher</h1>
      <div className="dice-buttons">
        {DICE.map((sides) => (
          <button key={sides} onClick={() => handleRoll(sides)}>
            Roll D{sides}
          </button>
        ))}
      </div>
      {result && (
        <div className="result">
          <p>
            You rolled a {result.rolls} on a D{result.sides}!
          </p>
        </div>
      )}
    </main>
  );
}
