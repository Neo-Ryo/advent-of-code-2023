import { readFileSync } from "fs";
const input = readFileSync("./day-13/input.txt").toString();
const test = readFileSync("./day-13/test.txt").toString();

type RowCol = string[][];

function one(input: string) {
  const patterns = input.split("\n\n");
  let res = 0;
  for (const i in patterns) {
    const { rows, cols } = getOneInput(patterns[i]);
    const [rowRes, rowLargePat] = [checkAllLines(rows), findLargeMirrors(rows)];
    const [colRes, colLargePat] = [checkAllLines(cols), findLargeMirrors(cols)];
    // console.log("ROWS: ", rowRes, rowLargePat);
    // console.log("COLS: ", colRes, colLargePat);
    res += rowLargePat * 100;
    res += colLargePat;
  }
  console.log("RES: ", res);
}

function getOneInput(pattern: string): { rows: RowCol; cols: RowCol } {
  const rows: RowCol = pattern.split("\n").map((l) => l.split(""));
  const cols: RowCol = [];
  for (const idx in rows) {
    const i = Number(idx);
    for (const jdx in rows[i]) {
      const j = Number(jdx);
      if (i === 0) {
        cols.push([rows[i][j]]);
      } else {
        cols[j].push(rows[i][j]);
      }
    }
  }
  //   console.log(rows);
  //   console.log(cols);
  return { rows, cols };
}

function checkArrayMirrors(a: Array<string>, b: Array<string>): boolean {
  let res: boolean = true;
  for (const idx in a) {
    if (a[idx] !== b[idx]) {
      res = false;
    }
  }
  return res;
}

function checkAllLines(lines: RowCol): number[] {
  const res: number[] = [];
  for (const idx in lines) {
    const i = Number(idx);
    for (const jdx in lines) {
      const j = Number(jdx);
      if (i !== j) {
        if (checkArrayMirrors(lines[i], lines[j])) {
          res.push(i < j ? i : j);
        }
      }
    }
  }
  return [...new Set(res)];
}

function findLargeMirrors(lines: RowCol): number {
  let res: number = 0;
  for (const idx in lines) {
    const i = Number(idx);
    for (const jdx in lines) {
      const j = Number(jdx);
      if (i !== j) {
        if (checkArrayMirrors(lines[i], lines[j])) {
          // check backwrd patterns
          let n = 0;
          let t = true;
          if (i === j - 1) {
            while (t) {
              if (
                lines[i - n] &&
                lines[j + n] &&
                checkArrayMirrors(lines[i - n], lines[j + n])
              ) {
                n++;
              } else {
                t = false;
              }
            }
            if (n > 1) {
              res += n;
            }
          }
          if (i === j + 1) {
            while (t) {
              if (
                lines[i + n] &&
                lines[j - n] &&
                checkArrayMirrors(lines[i + n], lines[j - n])
              ) {
                n++;
              } else {
                t = false;
              }
            }
            if (n > 1) {
              res += n;
            }
          }
        }
      }
    }
  }
  return res;
}
one(test);
// one(input);
