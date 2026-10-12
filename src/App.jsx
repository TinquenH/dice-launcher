import { useState } from "react";
import { rollDice } from "./lib/dice.js";

// --- Constantes ---------------------------------------------------------
const DICE = [4, 6, 8, 10, 12, 20, 100];
const MIN_COUNT = 1;
const MAX_COUNT = 20;
const MIN_MOD = -20;
const MAX_MOD = 20;

// --- Fonctions utilitaires ---------------------------------------------
// Garde `value` entre `min` et `max` : en dessous du min on renvoie le min,
// au-dessus du max on renvoie le max. Évite les valeurs impossibles.
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// Prépare l'affichage du modificateur : "" si 0, "+3" ou "-2" sinon.
// Pour un nombre négatif, le signe "-" est déjà dans le nombre lui-même.
const formatModifier = (modifier) => {
  if (modifier === 0) return "";
  return modifier > 0 ? `+${modifier}` : `${modifier}`;
};

export default function App() {
  // --- État ------------------------------------------------------------
  // Chaque useState est une "mémoire" du composant. Quand on appelle le
  // setter (setSides, setCount...), React réaffiche le composant avec la
  // nouvelle valeur.
  const [sides, setSides] = useState(20); // dé sélectionné (D20 par défaut)
  const [count, setCount] = useState(1); // nombre de dés à lancer (1 par défaut)
  const [modifier, setModifier] = useState(0); // bonus ou malus
  const [result, setResult] = useState(null); // null = aucun jet pour l'instant

  // --- Action ----------------------------------------------------------
  // Appelée seulement par le bouton "Lancer". On y stocke aussi sides et
  // count dans le résultat : si tu changes le dé APRES le lancer, le détail
  // affiché doit rester celui du jet qui a eu lieu, pas celui du réglage actuel.
  const handleRoll = () => {
    setResult({ sides, count, ...rollDice(count, sides, modifier) });
    // `...rollDice(...)` "déplie" l'objet renvoyé ({ rolls, modifier, total })
    // dans le nouvel objet. Résultat final : { sides, count, rolls, modifier, total }
  };

  return (
    <main>
      <h1>Dice Launcher</h1>
      <p className="sub">
        Choisis un dé, ajuste le nombre et le modificateur, puis lance.
      </p>

      <section className="panel" aria-label="Launch settings">
        {/* Choix du dé -------------------------------------------------- */}
        <div className="dice" id="dice" role="group" aria-label="Dice type">
          {/* .map crée un bouton par valeur de DICE. `key` est obligatoire :
          React s'en sert pour identifier chaque élément de la liste. */}
          {DICE.map((value) => (
            <button
              key={value}
              type="button"
              // Vrai pour le dé choisi : ton CSS s'en sert pour le colorer,
              // et les lecteurs d'écran annoncent le bouton comme "enfoncé".
              aria-pressed={sides === value}
              onClick={() => setSides(value)}
            >
              D{value}
            </button>
          ))}
        </div>

        <div className="row">
          {/* Stepper du nombre de dés ------------------------------------ */}
          <div className="field">
            {/* `htmlFor` remplace `for` de HTML : en JSX, `for` est un mot
            réservé de JavaScript. Idem pour pour `className` à la place de `class`. */}
            <label htmlFor="qv">Nombre de dés</label>
            <div className="stepper">
              <button
                type="button"
                aria-label="Un dé de moins" // texte lu par les lecteurs d'écran
                disabled={count <= MIN_COUNT} // grisé quand on est à la limite
                onClick={() => setCount(clamp(count - 1, MIN_COUNT, MAX_COUNT))}
              >
                −
              </button>
              {/* <output> sert à afficher une valeur calculée ; on y met
                  l'état directement avec des accolades : {count} */}
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

          {/* Stepper du modificateur ------------------------------------ */}
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
              {/* Ici on affiche toujours le signe, même pour 0 ("+0"), contrairement 
                  à formatModifier qui renvoie "" quand il vaut 0 */}
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

        {/* Le libellé du bouton se met à jour en direct selon les réglages */}
        <button id="roll" type="button" onClick={handleRoll}>
          Lancer {count}d{sides}
          {formatModifier(modifier)}
        </button>
      </section>

      {/* Résultat ------------------------------------ */}
      <section className="panel" id="result">
        {/* Condition ternaire : s'il y a un résultat on l'affiche, sinon "-" */}
        <div id="total">{result ? result.total : "–"}</div>
        <div id="detail">
          {result
            ? // Exemple : "2d6+3 : [4, 2]" ; join(", ") colle les jets avec des virgules
              `${result.count}d${result.sides}${formatModifier(result.modifier)} : [${result.rolls.join(", ")}]`
            : "Ton premier jet apparaîtra ici"}
        </div>
        <div id="note"></div> {/* (20 et 1 naturels) */}
      </section>

      {/* Historique ------------------------------------ */}
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
