// Dice rolling utility functions

// Rolls a single die with the given number of sides and an optional modifier
export const rollDie = (sidesValue, modifier = 0) => {
  return Math.floor(Math.random() * sidesValue) + 1 + modifier;
};

// Rolls multiple dice and returns the individual rolls and the total
export const rollDice = (numDice, sidesValue, modifier = 0) => {
  const rolls = [];

  for (let i = 0; i < numDice; i++) {
    rolls.push(rollDie(sidesValue, modifier));
  }

  const result = rolls.reduce((acc, curr) => acc + curr, 0);

  return { rolls, total: result + modifier };
};
