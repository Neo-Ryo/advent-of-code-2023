import { readFileSync } from "fs";
const input = readFileSync("./day-11/input.txt").toString();
const test = readFileSync("./day-11/test.txt").toString();

type Star = {
  name: string;
  row: number;
  col: number;
};

function one(input: string) {
  const rows = input.split("\n");
  const cols: string[] = [];
  for (const i in rows) {
    for (const j in rows[i].split("")) {
      if (Number(i) === 0) {
        cols.push(rows[Number(i)][Number(j)]);
      } else {
        cols[j] += rows[Number(i)][Number(j)];
      }
    }
  }
  const rowsExpanded = rows.reduce((acc: number[], c, i) => {
    if (c.split("").every((e) => e === ".")) acc.push(i);
    return acc;
  }, []);
  const colsExpanded = cols.reduce((acc: number[], c, i) => {
    if (c.split("").every((e) => e === ".")) acc.push(i);
    return acc;
  }, []);
  console.log(rowsExpanded, colsExpanded);
  const starsWithPositions = rows.reduce((acc: Star[], c, i) => {
    for (const j in c.split("")) {
      if (c[j] === "#") {
        acc.push({
          name: String(acc.length),
          row: i,
          col: Number(j),
        });
      }
    }
    return acc;
  }, []);
  const pairsToCheck = starsWithPositions.reduce((acc: Star[][], c, i, arr) => {
    for (const j in arr) {
      if (arr[i + Number(j) + 1]) {
        acc.push([c, arr[i + Number(j) + 1]]);
      }
    }
    return acc;
  }, []);
  let res = 0;
  let ext = 0;
  for (const pair of pairsToCheck) {
    console.log(pair);
    const path = getPath(pair[0], pair[1], rows, cols);
    console.log(path);
    const numOfExt = getExtendedAreas(path, rowsExpanded, colsExpanded);
    const lgt = path.length;
    ext += numOfExt;
    res += lgt;
  }
  console.log(res, ext);
  console.log(res + ext);
}

function getPath(
  starA: Star,
  starB: Star,
  rows: string[],
  cols: string[]
): { row: number; col: number }[] {
  let [rowA, colA] = [starA.row, starA.col];
  let [rowB, colB] = [starB.row, starB.col];
  const path: { row: number; col: number }[] = [];
  while (rowB - rowA || colB - colA) {
    // need to consider alternative path
    if (Math.abs(rowB - rowA) >= Math.abs(colB - colA)) {
      rowB - rowA < 0 ? rowA-- : rowA++;
    } else {
      colB - colA < 0 ? colA-- : colA++;
    }
    // console.log(rowA, colA);
    path.push({ row: rowA, col: colA });
  }
  return path;
}

function getExtendedAreas(
  path: { row: number; col: number }[],
  rowsExpended: number[],
  colsExpanded: number[]
) {
  let numExtended = 0;
  for (const step of path) {
    if (colsExpanded.includes(step.col) || rowsExpended.includes(step.row)) {
      numExtended++;
    }
  }

  return numExtended;
}

// one(test);
one(input);
// low 8917921
// low 9295461
// fail 9389422
