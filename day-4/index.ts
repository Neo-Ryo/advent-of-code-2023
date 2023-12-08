import { readFileSync } from "fs";

const input = readFileSync("./day-4/input.txt").toString();

function partOne(input: string) {
  const lines = input.split("\n");
  let points = 0;
  for (const line of lines) {
    let gamepoints = 0;
    const playerCards = line
      .split(": ")[1]
      .split(" |")[0]
      .split(" ")
      .filter((n) => n !== "");
    const winningNums = line
      .split("| ")[1]
      .split(" ")
      .filter((n) => n !== "");
    for (const num of playerCards) {
      if (winningNums.includes(num)) {
        gamepoints === 0 ? gamepoints++ : (gamepoints *= 2);
      }
    }
    points += gamepoints;
  }

  console.log(points);
}

function partTwo(input: string) {
  const lines = input.split("\n");
  let scratchCards = 0;
  const cardsInstances: { cardNum: number; inst: number }[] = [];
  for (const line of lines) {
    const cardNum = parseInt(line.split(":")[0].split(/\s+/g)[1]);
    const playerCards = line
      .split(": ")[1]
      .split(" |")[0]
      .split(" ")
      .filter((n) => n !== "");
    const winningNums = line
      .split("| ")[1]
      .split(" ")
      .filter((n) => n !== "");
    const foundCurrInst = cardsInstances.find((ci) => ci.cardNum === cardNum);
    let win = 0;
    for (const num of playerCards) {
      if (winningNums.includes(num)) {
        win++;
        const nextInstNum = cardNum + win;
        const foundInst = cardsInstances.find((e) => e.cardNum === nextInstNum);
        if (foundInst) {
          foundInst.inst =
            foundInst.inst + 1 + (foundCurrInst?.inst ? foundCurrInst.inst : 0);
        } else {
          cardsInstances.push({
            cardNum: cardNum + win,
            inst: 1 + (foundCurrInst?.inst ? foundCurrInst.inst : 0),
          });
        }
        console.log(cardsInstances);
      }
    }

    scratchCards++;
    for (const inst of cardsInstances.filter((ci) => ci.cardNum === cardNum)) {
      scratchCards += inst.inst;
    }
  }
  console.log(scratchCards);
}

const test = `Card   1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card   2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card   3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card   4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card   5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card   6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;
partOne(input);
partTwo(input);
