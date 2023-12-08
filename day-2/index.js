const { inputs } = require("./input");

const gamesInputs = [];

for (const game of inputs.split("\n")) {
  let gameObj = {};
  const gameNum = parseInt(game.split(" ")[1]);
  Object.assign(gameObj, { "game-num": gameNum });
  gamesInputs.push(gameObj);
  const [_irr, gamesCubes] = game.split(": ");
  for (const cube of gamesCubes.split("; ").flatMap((e) => e.split(", "))) {
    const [cubeNum, cubeCol] = cube.split(" ");
    if (!gameObj[cubeCol] || gameObj[cubeCol] < parseInt(cubeNum)) {
      Object.assign(gameObj, { [cubeCol]: parseInt(cubeNum) });
    }
  }
}

const filterG = gamesInputs.reduce((acc, curr) => {
  acc += curr["red"] * curr["green"] * curr["blue"];
  return acc;
}, 0);
console.log(filterG);
