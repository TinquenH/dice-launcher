// Lance un dé à `sides` faces et renvoie le résultat
export const rollDie = (sides) => {
  return Math.floor(Math.random() * sides) + 1;
};

// Lance `count` dés à `sides` faces, ajoute le `modifier` et renvoie le résultat
export const rollDice = (count, sides, modifier = 0) => {
  const rolls = [];

  for (let i = 0; i < count; i++) {
    rolls.push(rollDie(sides));
  }

  const sum = rolls.reduce((acc, curr) => acc + curr, 0);

  return { rolls, modifier, total: sum + modifier };
};

// Lance un D20 avec avantage, désavantage ou normalement.
export const rollD20 = (modifier = 0, mode = "normal") => {
  const rolls = mode === "normal" ? [rollDie(20)] : [rollDie(20), rollDie(20)];

  let kept = rolls[0];
  if (mode === "advantage") kept = Math.max(...rolls);
  if (mode === "disadvantage") kept = Math.min(...rolls);

  return { rolls, kept, modifier, mode, total: kept + modifier };
};
