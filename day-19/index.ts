import { readFileSync } from "fs";
const input = readFileSync("./day-19/input.txt").toString();
const test = readFileSync("./day-19/test.txt").toString();

enum EPart {
  X = "x",
  A = "a",
  M = "m",
  S = "s",
}

type Part = {
  x: number;
  a: number;
  m: number;
  s: number;
};
function one(input: string) {
  const [wf, p] = input.split("\n\n");
  const [workflows, parts] = [wf.split("\n"), p.split("\n")];
  console.log(workflows);
  console.log(parts);
  const res: Part[] = [];
  for (const part of parts) {
    const p = partParsing(part);
    let result: {
      result: "A" | "R" | undefined;
      nextWk: string | undefined;
    } = { result: undefined, nextWk: undefined };
    const wkStarterName = workflows
      .find((e) => e.split("{")[0] === "in")!
      .split("{")[0];
    result = workflowTesting(wkStarterName, workflows, p);
    if (result.result === "A") res.push(p);
  }
  console.log(res);
  const x = res.reduce((acc, curr) => {
    acc += curr.a + curr.m + curr.s + curr.x;
    return acc;
  }, 0);
  console.log(x);
}

function partParsing(part: string): Part {
  let p = { x: 0, a: 0, m: 0, s: 0 };
  part
    .replace(/{|}/g, "")
    .split(",")
    .forEach((el) => {
      const [key, value] = el.split("=");
      switch (key) {
        case EPart.A:
          p.a = Number(value);
          break;
        case EPart.M:
          p.m = Number(value);
          break;
        case EPart.S:
          p.s = Number(value);
          break;
        case EPart.X:
          p.x = Number(value);
          break;
        default:
          break;
      }
    });
  return p;
}

function compare(wkNum: number, wkCond: string, partNumber: number): Boolean {
  console.log("COMPARE: ", partNumber, wkCond, wkNum);

  if (wkCond === ">") {
    if (partNumber > wkNum) return true;
    return false;
  } else {
    if (partNumber < wkNum) return true;
    return false;
  }
}

function workflowTesting(
  wkName: string,
  wks: string[],
  part: Part
): {
  result: "A" | "R" | undefined;
  nextWk: string | undefined;
} {
  const wk = wks.find((e) => e.split("{")[0] === wkName)!;
  const name = wk.split("{")[0];
  const conds = wk.split(name)[1].replace(/{|}/g, "").split(",");
  //   console.log(name, conds);
  let result: {
    result: "A" | "R" | undefined;
    nextWk: string | undefined;
  } = {
    result: undefined,
    nextWk: undefined,
  };
  for (const cond of conds) {
    console.log(cond);

    if (cond.length === 1 && (cond[0] === "A" || cond[0] === "R")) {
      result.result = cond[0];
      break;
    }
    if (cond.includes(">")) {
      const [p, rest] = cond.split(">");
      // console.log("P, REST: ", p, rest);
      if (rest === undefined) {
        result.nextWk = p;
        break;
      }
      const [value, res] = rest.split(":");
      if (compare(Number(value), ">", part[p as EPart])) {
        // console.log("XXXXX: ", lastValue, "<", part[p as EPart]);
        // console.log("res: ", res);
        if (res === "A" || res === "R") {
          console.log("A OR R: ", res, Number(value));

          result.result = res;
          break;
        } else {
          result.nextWk = res;
          break;
        }
      }
    } else {
      const [p, rest] = cond.split("<");
      // console.log(p, rest);
      if (rest === undefined) {
        result.nextWk = p;
        break;
      }
      const [value, res] = rest.split(":");
      if (compare(Number(value), "<", part[p as EPart])) {
        if (res === "A" || res === "R") {
          console.log("A OR R: ", res, Number(value));
          result.result = res;
          break;
        } else {
          result.nextWk = res;
          break;
        }
      }
    }
  }
  console.log(result);

  if (result.nextWk !== undefined) {
    return workflowTesting(result.nextWk, wks, part);
  }
  return result;
}
// one(test);
one(input);
