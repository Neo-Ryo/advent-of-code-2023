import { readFileSync } from "fs";

const input = readFileSync("./day-7/input.txt").toString();
const test = readFileSync("./day-7/test.txt").toString();

type HandsEnum = { type: string; force: number };
type HandsGame = HandsEnum & { hand: string; bid: number };

const handsEnum: HandsEnum[] = [
  { type: "five-of-a-kind", force: 7 },
  { type: "four-of-a-kind", force: 6 },
  { type: "full-house", force: 5 },
  { type: "three-of-a-kind", force: 4 },
  { type: "two-pair", force: 3 },
  { type: "one-pair", force: 2 },
  { type: "none", force: 1 },
];

const cardsEnum: { card: string; force: number }[] = [
  { card: "2", force: 2 },
  { card: "3", force: 3 },
  { card: "4", force: 4 },
  { card: "5", force: 5 },
  { card: "6", force: 6 },
  { card: "7", force: 7 },
  { card: "8", force: 8 },
  { card: "9", force: 9 },
  { card: "T", force: 10 },
  { card: "J", force: 1 },
  { card: "Q", force: 12 },
  { card: "K", force: 13 },
  { card: "A", force: 14 },
];
function one(input: string) {
  const lines = input.split("\n");
  const handGames: HandsGame[] = [];
  for (const line of lines) {
    const [hand, bid] = line.split(" ");
    // console.log(hand, bid);
    // console.log(checkHand(hand));
    handGames.push({ ...checkHand(hand), hand, bid: parseInt(bid) });
  }
  const orderedByForce = handGames
    .sort((a, b) => a.force - b.force)
    .sort((a, b) => {
      if (a.force === b.force) {
        return checkHandForce(a, b);
      }
      return 0;
    });

  console.log(orderedByForce);
  console.log(
    orderedByForce.reduce((acc, c, i) => {
      acc += c.bid * (i + 1);
      return acc;
    }, 0)
  );
}

function checkHandForce(a: HandsGame, b: HandsGame) {
  const [cardsA, cardsB] = [a.hand.split(""), b.hand.split("")];
  for (const i in cardsA) {
    const [forceA, forceB] = [
      cardsEnum.find((e) => e.card === cardsA[i])!,
      cardsEnum.find((e) => e.card === cardsB[i])!,
    ];
    if (forceA !== forceB) {
      return forceA.force - forceB.force;
    }
  }
  return 0;
}

function checkHand(hand: string): HandsEnum {
  const cards = hand.split("");
  const set: { card: string; n: number }[] = [];
  for (const card of cards) {
    const found = set.find((e) => e.card === card);
    if (found) {
      found.n++;
    } else {
      set.push({ card, n: 1 });
    }
  }
  if (set.length === 1 && set[0].n === 5) {
    // "five-of-a-kind";
    return handsEnum[0];
  } else if (set.length === 2) {
    if (set.some((e) => e.n === 4)) {
      // "four-of-a-kind";
      return handsEnum[1];
    } else {
      // "full-house";
      return handsEnum[2];
    }
  } else if (set.length === 3) {
    if (set.some((e) => e.n === 3)) {
      // "three-of-a-kind";
      return handsEnum[3];
    } else {
      // "two-pair";
      return handsEnum[4];
    }
  } else {
    if (set.some((e) => e.n === 2)) {
      // one pair
      return handsEnum[5];
    } else {
      return handsEnum[6];
    }
  }
}

function checkHandAndImprove(hand: string): HandsEnum {
  const cards = hand.split("");
  const set: { card: string; n: number }[] = [];
  for (const card of cards) {
    const found = set.find((e) => e.card === card);
    if (found) {
      found.n++;
    } else {
      set.push({ card, n: 1 });
    }
  }
  const js = set.find((e) => e.card === "J")?.n;
  if (set.length === 1 && set[0].n === 5) {
    // "five-of-a-kind";
    return handsEnum[0];
  } else if (set.length === 2 && set.some((e) => e.n === 4)) {
    // "four-of-a-kind";
    if (js) {
      // five of a kind
      return handsEnum[0];
    }
    // "four-of-a-kind";
    return handsEnum[1];
  } else if (set.length === 2 && set.some((e) => e.n === 3)) {
    // "full-house";
    if (js) {
      // five of a kind
      return handsEnum[0];
    }
    // "full-house";
    return handsEnum[2];
  } else if (set.length === 3 && set.some((e) => e.n === 3)) {
    // "three-of-a-kind";
    if (js) {
      // four of a kind
      return handsEnum[1];
    }
    // "three-of-a-kind";
    return handsEnum[3];
  } else if (set.length === 3 && set.some((e) => e.n === 2)) {
    // "two-pair";
    if (js) {
      if (js === 1) {
        //full house
        return handsEnum[2];
      } else if (js === 2) {
        //four of a kind
        return handsEnum[1];
      }
    }
    // "two-pair";
    return handsEnum[4];
  } else if (set.some((e) => e.n === 2)) {
    // one pair
    if (js) {
      // three of a kind
      return handsEnum[3];
    }
    return handsEnum[5];
  } else {
    if (js) {
      // one pair
      return handsEnum[5];
    }
    // none
    return handsEnum[6];
  }
}

function two(input: string) {
  const lines = input.split("\n");
  const handGames: HandsGame[] = [];
  for (const line of lines) {
    const [hand, bid] = line.split(" ");
    // console.log(hand, bid);
    // console.log(checkHand(hand));
    handGames.push({ ...checkHandAndImprove(hand), hand, bid: parseInt(bid) });
  }
  const orderedByForce = handGames
    .sort((a, b) => a.force - b.force)
    .sort((a, b) => {
      if (a.force === b.force) {
        return checkHandForce(a, b);
      }
      return 0;
    });

  //   console.log(orderedByForce.filter((e) => e.hand.includes("J")));
  console.log(orderedByForce);
  console.log(
    orderedByForce.reduce((acc, c, i) => {
      acc += c.bid * (i + 1);
      return acc;
    }, 0)
  );
}

// one(test);
one(input);
// two(test);
two(input);
