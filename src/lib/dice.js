// Dice rolling utility functions

// Rolls a single die with the given number of sides
export const rollDie = (sides) => {
  return Math.floor(Math.random() * sides) + 1;
};

// Rolls multiple dice and returns the individual rolls and the total
export const rollDice = (count, sides, modifier = 0) => {
  const rolls = [];

  for (let i = 0; i < count; i++) {
    rolls.push(rollDie(sides));
  }

  const sum = rolls.reduce((acc, curr) => acc + curr, 0);

  return { rolls, modifier, total: sum + modifier };
};
