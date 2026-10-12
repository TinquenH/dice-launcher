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
