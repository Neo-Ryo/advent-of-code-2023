import { readFileSync } from "fs";

const input = readFileSync("./day-10/input.txt").toString();
const test = readFileSync("./day-10/test.txt").toString();

const pipes: { p: string; in: string; out: string }[] = [
  { p: "|", in: "north", out: "south" },
  { p: "|", in: "south", out: "north" },
  { p: "-", in: "west", out: "east" },
  { p: "-", in: "east", out: "west" },
  { p: "L", in: "north", out: "east" },
  { p: "L", in: "east", out: "north" },
  { p: "J", in: "north", out: "west" },
  { p: "J", in: "west", out: "north" },
  { p: "7", in: "west", out: "south" },
  { p: "7", in: "south", out: "west" },
  { p: "F", in: "east", out: "south" },
  { p: "F", in: "south", out: "east" },
];

type Position = { pipe: string; to: string; pos: { r: number; c: number } };

function one(input: string) {
  const lines = input.split("\n").map((e) => e.split(""));
  const [startRow, startCol] = [
    lines.findIndex((e) => e.includes("S")),
    lines.find((e) => e.includes("S"))!.findIndex((e) => e === "S"),
  ];
  console.log(startRow, startCol);
  console.log(lines[startRow][startCol]);
  const directions = ["north", "east", "south", "west"];
  const curr: Position = {
    pipe: "S",
    to: "S",
    pos: { r: startRow, c: startCol },
  };
  let next: Position | undefined = curr;
  let step = 0;
  const steps: number[] = [];
  for (const dir of directions) {
    console.log(dir);

    while (next) {
      next = getNextInput(next, next.to === "S" ? dir : next.to, lines);
      step++;
    }
    steps.push(step - 1);
    step = 0;
    next = curr;
  }
  console.log(steps);
}

function getNextInput(
  curr: Position,
  to: string,
  input: string[][]
): Position | undefined {
  if (to === "north") {
    const [row, col] = [curr.pos.r, curr.pos.c];
    if (row - 1 >= 0) {
      const nextPipeSympol = input[row - 1][col];
      const nextPipeFound = pipes.find(
        (e) => e.p === nextPipeSympol && e.in === "south"
      );
      console.log(nextPipeSympol);
      console.log(nextPipeFound);
      if (nextPipeFound) {
        const [i, o] = [nextPipeFound.in, nextPipeFound.out];
        const nextPipe = {
          pos: { r: row - 1, c: col },
          pipe: nextPipeFound.p,
          to: nextPipeFound.out,
        };
        return nextPipe;
      }
    }
  } else if (to === "south") {
    const [row, col] = [curr.pos.r, curr.pos.c];
    if (row + 1 <= input.length - 1) {
      const nextPipeSympol = input[row + 1][col];
      const nextPipeFound = pipes.find(
        (e) => e.p === nextPipeSympol && e.in === "north"
      );
      console.log(nextPipeSympol);
      console.log(nextPipeFound);
      if (nextPipeFound) {
        const [i, o] = [nextPipeFound.in, nextPipeFound.out];
        const nextPipe = {
          pos: { r: row + 1, c: col },
          pipe: nextPipeFound.p,
          to: nextPipeFound.out,
        };
        return nextPipe;
      }
    }
  } else if (to === "east") {
    const [row, col] = [curr.pos.r, curr.pos.c];
    if (col + 1 <= input[curr.pos.r].length - 1) {
      const nextPipeSympol = input[row][col + 1];
      const nextPipeFound = pipes.find(
        (e) => e.p === nextPipeSympol && e.in === "west"
      );
      console.log(nextPipeSympol);
      console.log(nextPipeFound);
      if (nextPipeFound) {
        const [i, o] = [nextPipeFound.in, nextPipeFound.out];
        const nextPipe = {
          pos: { r: row, c: col + 1 },
          pipe: nextPipeFound.p,
          to: nextPipeFound.out,
        };
        return nextPipe;
      }
    }
  } else {
    // west
    const [row, col] = [curr.pos.r, curr.pos.c];
    if (col - 1 >= 0) {
      const nextPipeSympol = input[row][col - 1];
      const nextPipeFound = pipes.find(
        (e) => e.p === nextPipeSympol && e.in === "east"
      );
      console.log(nextPipeSympol);
      console.log(nextPipeFound);
      if (nextPipeFound) {
        const [i, o] = [nextPipeFound.in, nextPipeFound.out];
        const nextPipe = {
          pos: { r: row, c: col - 1 },
          pipe: nextPipeFound.p,
          to: nextPipeFound.out,
        };
        return nextPipe;
      }
    }
  }
}

// function getNextDir(from: string, pipe: string) {}
one(test);
// one(input);
