import { input } from "./input";
import { isNumber } from "../utils/utils";

type NumWithPos = { num: number; start: number; end: number }[];
type SymWithPos = { symb: string; pos: number }[];
type ExtratedData = { numsWithPos: NumWithPos; symbs: SymWithPos };

function getNumsPositions(line: string | undefined) {
  if (line) {
    let num = "";
    const numsWithPos: NumWithPos = [];
    const symbs: SymWithPos = [];
    for (const i in line.split("")) {
      const char = line[i];
      if (isNumber(char)) {
        num += char;
      } else if (char === ".") {
        if (num) {
          numsWithPos.push({
            num: parseInt(num),
            start: parseInt(i) - num.length + 1,
            end: parseInt(i),
          });
        }
        num = "";
      } else {
        symbs.push({ symb: char, pos: parseInt(i) + 1 });
        if (num) {
          numsWithPos.push({
            num: parseInt(num),
            start: parseInt(i) - num.length + 1,
            end: parseInt(i),
          });
        }
        num = "";
      }
    }
    if (num) {
      numsWithPos.push({
        num: parseInt(num),
        start: line.length - num.length + 1,
        end: line.length,
      });
    }
    return { numsWithPos, symbs };
  }
}

function extractNumbers(
  curr: ExtratedData,
  b4?: ExtratedData,
  after?: ExtratedData
) {
  const numsFound: number[] = [];
  for (const e of curr.numsWithPos) {
    const { start, end, num } = e;
    const found = curr.symbs.find(
      (e) => e.pos === start - 1 || e.pos === end + 1
    );
    if (found) {
      numsFound.push(num);
      continue;
    }
    const nLinesSymbs: SymWithPos = [];
    if (b4) {
      nLinesSymbs.push(...b4.symbs);
    }
    if (after) {
      nLinesSymbs.push(...after.symbs);
    }
    const foundSymbs = nLinesSymbs.find(
      (e) => e.pos >= start - 1 && e.pos <= end + 1
    );
    if (foundSymbs) {
      numsFound.push(num);
      continue;
    }
  }
  return numsFound;
}

// part 2
function extractNumsMultiplied(
  curr: ExtratedData,
  b4?: ExtratedData,
  after?: ExtratedData
) {
  const numsFound: number[] = [];
  const currStars = curr.symbs.filter((e) => e.symb === "*");
  const b4AndAfterNums = (b4?.numsWithPos ?? []).concat(
    after?.numsWithPos ?? []
  );

  for (const star of currStars) {
    const currB4 = curr.numsWithPos.find((e) => e.end === star.pos - 1);
    const currAfter = curr.numsWithPos.find((e) => e.start === star.pos + 1);
    const others = b4AndAfterNums.filter(
      (e) => e.start <= star.pos + 1 && e.end >= star.pos - 1
    );
    let numberOfNeighbours = 0;
    if (currB4) numberOfNeighbours += 1;
    if (currAfter) numberOfNeighbours += 1;
    numberOfNeighbours += others.length;
    console.log(currB4);
    console.log(currAfter);
    console.log(others);

    if (numberOfNeighbours === 2) {
      const arr: number[] = [...others.map((e) => e.num)];
      if (currB4) arr.push(currB4.num);
      if (currAfter) arr.push(currAfter.num);
      console.log("ARR: ", arr);

      numsFound.push(arr[0] * arr[1]);
    }
  }
  return numsFound;
}

function getSumOfAllPieces(input: string) {
  const linesArr = input.split("\n");

  const numsToAdd: number[] = [];
  for (const index in linesArr) {
    const i = parseInt(index);

    const lineB4 = getNumsPositions(linesArr[i - 1]);
    const currLineData = getNumsPositions(linesArr[i])!;
    const nextLine = getNumsPositions(linesArr[i + 1]);
    numsToAdd.push(...extractNumsMultiplied(currLineData, lineB4, nextLine));
    // numsToAdd.push(...extractNumbers(currLineData, lineB4, nextLine));
  }

  return numsToAdd.reduce((acc, curr) => acc + curr, 0);
}

const test = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
console.log(getSumOfAllPieces(input));
