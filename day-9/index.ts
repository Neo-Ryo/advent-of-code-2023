import { readFileSync } from "fs";

const input = readFileSync("./day-9/input.txt").toString();
const test = readFileSync("./day-9/test.txt").toString();

function one(input: string) {
  const lines = input.split("\n");
  const valuesToAdd: number[] = [];
  for (const line of lines) {
    const values = line.split(" ").map((e) => parseInt(e));
    const diffs: number[][] = [values];
    getNextDiffs(values, diffs);
    let nextVal = 0;
    for (const index in diffs.reverse()) {
      const i = Number(index);
      if (i > 0) {
        const lastCurr = diffs[i][diffs[i].length - 1];
        nextVal += lastCurr;
      }
    }
    valuesToAdd.push(nextVal);
  }
  console.log(valuesToAdd);
  console.log(valuesToAdd.reduce((a, c) => (a += c), 0));
}

function getNextDiffs(a: number[], diffs: number[][]): void {
  const res: number[] = [];
  for (const index in a) {
    const i = Number(index);
    if (i < a.length - 1) {
      res.push(a[i + 1] - a[i]);
    }
  }
  diffs.push(res);
  if (res.length && !res.every((e) => e === 0)) {
    getNextDiffs(res, diffs);
  }
}

function two(input: string) {
  const lines = input.split("\n");
  const valuesToAdd: number[] = [];
  for (const line of lines) {
    const values = line.split(" ").map((e) => parseInt(e));
    const diffs: number[][] = [values];
    getNextDiffs(values, diffs);
    console.log(diffs);

    let nextVal = 0;
    for (const index in diffs.reverse()) {
      const i = Number(index);
      if (i > 0) {
        const firstCurr = diffs[i][0];
        nextVal = firstCurr - nextVal;
      }
      console.log(nextVal);
    }
    valuesToAdd.push(nextVal);
  }
  console.log(valuesToAdd);
  console.log(valuesToAdd.reduce((a, c) => (a += c), 0));
}

// one(input);

two(input);
