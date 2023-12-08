import { readFileSync } from "fs";

const input = readFileSync("./day-8/input.txt").toString();
const test = readFileSync("./day-8/test.txt").toString();

type Area = {
  area: string;
  left: string;
  right: string;
};

function one(input: string) {
  const split = input.split("\n");
  const [directions, mapping] = [
    split[0].split(""),
    split
      .filter((e, i) => e !== "" && i !== 0)
      .reduce<Area[]>((acc, c) => {
        const split = c.split(" = ");
        const [area, left, right] = [
          split[0],
          split[1].split(", ")[0].replace("(", ""),
          split[1].split(", ")[1].replace(")", ""),
        ];
        acc.push({ area, left, right });
        return acc;
      }, []),
  ];
  const startArea = mapping.find((e) => e.area === "AAA")!;
  const arrivalArea = mapping.find((e) => e.area === "ZZZ")!;
  let currArea: Area = startArea;
  let i = 0;
  let steps = 0;
  console.log(arrivalArea);

  while (currArea.area !== arrivalArea.area) {
    const currDir = directions[i];
    if (currDir === "L") {
      currArea = mapping.find((e) => e.area === currArea.left)!;
    } else {
      currArea = mapping.find((e) => e.area === currArea.right)!;
    }
    if (i < directions.length - 1) i++;
    else i = 0;
    steps++;
  }

  console.log(steps);
}

function two(input: string) {
  console.time("a");

  const split = input.split("\n");
  const [directions, mapping] = [
    split[0].split(""),
    split
      .filter((e, i) => e !== "" && i !== 0)
      .reduce<Area[]>((acc, c) => {
        const split = c.split(" = ");
        const [area, left, right] = [
          split[0],
          split[1].split(", ")[0].replace("(", ""),
          split[1].split(", ")[1].replace(")", ""),
        ];
        acc.push({ area, left, right });
        return acc;
      }, []),
  ];
  const startsWithA = mapping.filter((e) => e.area.endsWith("A"));
  const currAreasArr: Area[][] = [
    [startsWithA[0], startsWithA[1]],
    [startsWithA[2], startsWithA[3]],
    [startsWithA[4], startsWithA[5]],
  ];
  const nbs: number[] = [];
  for (const curr of currAreasArr) {
    let i = 0;
    let steps = 0;
    let currAreas = curr;
    while (!currAreas.every((e) => e.area.endsWith("Z"))) {
      const currDir = directions[i];
      currAreas = currAreas.reduce((acc: Area[], c) => {
        if (currDir === "L") {
          acc.push(mapping.find((e) => e.area === c.left)!);
        } else {
          acc.push(mapping.find((e) => e.area === c.right)!);
        }
        return acc;
      }, []);

      if (i < directions.length - 1) i++;
      else i = 0;
      steps++;
    }

    console.log(steps);
    nbs.push(steps);
  }
  console.log(lcm(nbs));
  console.timeEnd("a");
}

function gcd(array: number[]) {
  // Greatest common divisor of a list of integers
  var n = 0;
  for (var i = 0; i < array.length; ++i) n = gcd2(array[i], n);
  return n;
}
function gcd2(a: number, b: number): number {
  // Greatest common divisor of 2 integers
  if (!b) return b === 0 ? a : NaN;
  return gcd2(b, a % b);
}
function lcm2(a: number, b: number): number {
  // Least common multiple of 2 integers
  return (a * b) / gcd2(a, b);
}
function lcm(array: number[]) {
  // Least common multiple of a list of integers
  var n = 1;
  for (var i = 0; i < array.length; ++i) n = lcm2(array[i], n);
  return n;
}

// one(test);
one(input);
// two(test);
two(input);
