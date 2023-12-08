import { readFileSync } from "fs";

const input = readFileSync("./day-6/input.txt").toString();
const test = readFileSync("./day-6/test.txt").toString();

function one(input: string) {
  const [timesLine, distancesLine] = input.split("\n");
  const times = timesLine
    .split(/\s+/g)
    .map((e) => parseInt(e))
    .filter((e) => !Number.isNaN(e));
  const distances = distancesLine
    .split(/\s+/g)
    .map((e) => parseInt(e))
    .filter((e) => !Number.isNaN(e));

  const store: number[] = [];
  for (const i in times) {
    const time = times[i];
    const distance = distances[i];
    const currStore: number[] = [];
    for (let i = 0; i < time; i++) {
      if (i * (time - i) > distance) {
        currStore.push(i);
      }
    }
    store.push(currStore.length);
    console.log(store);
  }
  const res = store.reduce((acc, c, i) => {
    if (i === 0) {
      acc += c;
    } else {
      acc *= c;
    }
    return acc;
  }, 0);
  console.log(res);
}

function two(input: string) {
  const [timesLine, distancesLine] = input.split("\n");
  const time = Number(timesLine.split(/\s+/g).join("").replace("Time:", ""));

  const distance = Number(
    distancesLine.split(/\s+/g).join("").replace("Distance:", "")
  );
  const currStore: number[] = [];
  for (let i = 0; i < time; i++) {
    if (i * (time - i) > distance) {
      currStore.push(i);
    }
  }

  console.log(currStore.length);
}
// one(input);
two(test);
