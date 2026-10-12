import { useState } from "react";
import { rollDice } from "./lib/dice.js";

const DICE = [4, 6, 8, 10, 12, 20, 100];
const MIN_COUNT = 1;
const MAX_COUNT = 20;
const MIN_MOD = -20;
const MAX_MOD = 20;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const formatModifier = (modifier) => {
  if (modifier === 0) return "";
  return modifier > 0 ? `+${modifier}` : `${modifier}`;
};

export default function App() {
  const [sides, setSides] = useState(20);
  const [count, setCount] = useState(1);
  const [modifier, setModifier] = useState(0);
  const [result, setResult] = useState(null);

  const handleRoll = () => {
    setResult({ sides, count, ...rollDice(count, sides, modifier) });
  };

  return (
    <main>
      <h1>Dice Launcher</h1>
      <p className="sub">
        Choisis un dé, ajuste le nombre et le modificateur, puis lance.
      </p>

      <section className="panel" aria-label="Launch settings">
        <div className="dice" id="dice" role="group" aria-label="Dice type">
          {DICE.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={sides === value}
              onClick={() => setSides(value)}
            >
              D{value}
            </button>
          ))}
        </div>

        <div className="row">
          <div className="field">
            <label htmlFor="qv">Nombre de dés</label>
            <div className="stepper">
              <button
                type="button"
                aria-label="Un dé de moins"
                disabled={count <= MIN_COUNT}
                onClick={() => setCount(clamp(count - 1, MIN_COUNT, MAX_COUNT))}
              >
                −
              </button>
              <output id="qv">{count}</output>
              <button
                type="button"
                aria-label="Un dé de plus"
                disabled={count >= MAX_COUNT}
                onClick={() => setCount(clamp(count + 1, MIN_COUNT, MAX_COUNT))}
              >
                +
              </button>
            </div>
          </div>

          <div className="field">
            <label htmlFor="mv">Modificateur</label>
            <div className="stepper">
              <button
                type="button"
                aria-label="Mod. moins un"
                disabled={modifier <= MIN_MOD}
                onClick={() =>
                  setModifier(clamp(modifier - 1, MIN_MOD, MAX_MOD))
                }
              >
                −
              </button>
              <output id="mv">
                {modifier >= 0 ? `+${modifier}` : modifier}
              </output>
              <button
                type="button"
                aria-label="Mod. plus un"
                disabled={modifier >= MAX_MOD}
                onClick={() =>
                  setModifier(clamp(modifier + 1, MIN_MOD, MAX_MOD))
                }
              >
                +
              </button>
            </div>
          </div>
        </div>

        <button id="roll" type="button" onClick={handleRoll}>
          Lancer {count}d{sides}
          {formatModifier(modifier)}
        </button>
      </section>

      <section className="panel" id="result">
        <div id="total">{result ? result.total : "–"}</div>
        <div id="detail">
          {result
            ? `${result.count}d${result.sides}${formatModifier(result.modifier)} : [${result.rolls.join(", ")}]`
            : "Ton premier jet apparaîtra ici"}
        </div>
        <div id="note"></div>
      </section>

      <section className="panel" aria-label="Historique">
        <h2>Historique</h2>
        <ul id="history">
          <li className="empty">Aucun jet pour le moment.</li>
        </ul>
        <button id="clear" type="button" hidden>
          Effacer l'historique
        </button>
      </section>
    </main>
  );
}
