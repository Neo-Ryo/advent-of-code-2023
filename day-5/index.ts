import { readFileSync } from "fs";

const input = readFileSync("./day-5/input.txt").toString();
const test = readFileSync("./day-5/test.txt").toString();

const maps = [
  "seed-to-soil map:",
  "soil-to-fertilizer map:",
  "fertilizer-to-water map:",
  "water-to-light map:",
  "light-to-temperature map:",
  "temperature-to-humidity map:",
  "humidity-to-location map:",
];

function partOne(input: string) {
  const lines = input.split(/\n+/g);
  const seeds = lines[0]
    .split(" ")
    .filter((e) => e !== "seeds:")
    .map((e) => parseInt(e));
  //   console.log(seeds);
  let currentMap = { source: "", dest: "", nextBlock: 0 };
  const elements: Record<string, number[]>[] = [
    { seed: seeds },
    { soil: [] as number[] },
    { fertilizer: [] as number[] },
    { water: [] as number[] },
    { light: [] as number[] },
    { temperature: [] as number[] },
    { humidity: [] as number[] },
    { location: [] as number[] },
  ];
  for (const index in lines) {
    const i = parseInt(index);
    if (i !== 0) {
      const line = lines[i];
      if (maps.includes(line)) {
        const indexOfCurrentBlock = maps.indexOf(line);
        const nextBlock = lines.indexOf(maps[indexOfCurrentBlock + 1]);
        currentMap.source = line.split("-")[0];
        currentMap.dest = line.split("-")[2].split(" ")[0];
        if (maps[indexOfCurrentBlock] !== maps[maps.length - 1]) {
          currentMap.nextBlock = nextBlock;
        } else {
          currentMap.nextBlock = lines.length - 1;
        }
        // console.log(currentMap);
      } else {
        // store source + dest
        const [dest, source, lgt] = line.split(" ").map((e) => parseInt(e));
        const currentElementSource = elements.find(
          (e) => Object.keys(e)[0] === currentMap.source
        )!;
        const currentElementDest = elements.find(
          (e) => Object.keys(e)[0] === currentMap.dest
        )!;
        currentElementSource[currentMap.source] = currentElementSource[
          currentMap.source
        ].reduce((acc: number[], curr) => {
          if (curr >= source && curr <= source + lgt) {
            const index = curr <= source ? source - curr : curr - source;
            currentElementDest[currentMap.dest].push(dest + index);
          } else {
            acc.push(curr);
          }
          return acc;
        }, []);
        // console.log("source: ", currentElementSource[currentMap.source]);
        // console.log("dest: ", currentElementDest[currentMap.dest]);
        if (
          i === currentMap.nextBlock - 1 &&
          currentElementSource[currentMap.source].length
        ) {
          currentElementDest[currentMap.dest].push(
            ...currentElementSource[currentMap.source]
          );
        }
      }
    }
  }
  console.log(Math.min(...elements[elements.length - 1]["location"]));
}

type NumAndRange = { num: number; range: number };

function rangeComparator(
  input: NumAndRange,
  toCompare: { dest: number; source: number; lgt: number }
): { outers: NumAndRange[]; dest?: NumAndRange } {
  const [iStart, iEnd] = [input.num, input.num + input.range - 1];
  const [tcStart, tcEnd] = [
    toCompare.source,
    toCompare.source + toCompare.lgt - 1,
  ];
  const beforeOuterRange: NumAndRange | undefined =
    iStart < tcStart
      ? { num: iStart, range: Math.abs(iStart - tcStart) }
      : undefined;
  const afterOuterRange: NumAndRange | undefined =
    iEnd > tcEnd
      ? { num: tcEnd, range: Math.abs(tcEnd - iEnd + 1) }
      : undefined;
  const outers: NumAndRange[] = [];
  if (beforeOuterRange) outers.push(beforeOuterRange);
  if (afterOuterRange) outers.push(afterOuterRange);
  let innerRange: NumAndRange | undefined;
  if (iStart < tcEnd && iEnd > tcStart) {
    const num = iStart <= tcStart ? tcStart : iStart;
    const range = iEnd <= tcEnd ? iEnd + 1 - num : tcEnd + 1 - num;
    innerRange = {
      num: toCompare.dest,
      range: Math.abs(toCompare.lgt < range ? toCompare.lgt : range),
    };
  }

  return { outers, dest: innerRange };
}

function partTwo(input: string) {
  const lines = input.split(/\n+/g);
  const initialSeeds = lines[0]
    .split(" ")
    .filter((e) => e !== "seeds:")
    .map((e) => parseInt(e));

  const seeds: NumAndRange[] = [];
  for (const index in initialSeeds) {
    const i = parseInt(index);
    if (i > 0 && i % 2 === 1) {
      //after 1
      const [num, range] = [initialSeeds[i - 1], initialSeeds[i]];
      seeds.push({ num, range });
    }
  }
  let currentMap = { source: "", dest: "", nextBlock: 0 };
  let elements: Record<string, NumAndRange[]>[] = [
    { seed: seeds },
    { soil: [] as NumAndRange[] },
    { fertilizer: [] as NumAndRange[] },
    { water: [] as NumAndRange[] },
    { light: [] as NumAndRange[] },
    { temperature: [] as NumAndRange[] },
    { humidity: [] as NumAndRange[] },
    { location: [] as NumAndRange[] },
  ];
  //   console.log(elements);

  for (const index in lines) {
    const i = parseInt(index);
    if (i !== 0) {
      const line = lines[i];
      if (maps.includes(line)) {
        const indexOfCurrentBlock = maps.indexOf(line);
        const nextBlock = lines.indexOf(maps[indexOfCurrentBlock + 1]);
        currentMap.source = line.split("-")[0];
        currentMap.dest = line.split("-")[2].split(" ")[0];
        if (maps[indexOfCurrentBlock] !== maps[maps.length - 1]) {
          currentMap.nextBlock = nextBlock;
        } else {
          currentMap.nextBlock = lines.length - 1;
        }
        // console.log(currentMap);
      } else {
        // store source + dest
        const [currLineDest, currLineSource, lgt] = line
          .split(" ")
          .map((e) => parseInt(e));
        let currentElementSource = elements.find(
          (e) => Object.keys(e)[0] === currentMap.source
        )![currentMap.source];
        let currentElementDest = elements.find(
          (e) => Object.keys(e)[0] === currentMap.dest
        )![currentMap.dest];

        // console.log("source B4: ", currentElementSource);

        currentElementSource = currentElementSource.reduce(
          (acc: NumAndRange[], el) => {
            console.log(el);
            console.log(currLineSource, lgt);
            const { outers, dest } = rangeComparator(el, {
              dest: currLineDest,
              source: currLineSource,
              lgt,
            });
            console.log(outers, dest);
            if (dest) {
              currentElementDest.push({
                num: Math.abs(dest.num - currLineDest),
                range: dest.range,
              });
            }
            if (outers.length) {
              acc.push(...outers);
            }
            return acc;
          },
          []
        );
        console.log("curr after reduce", currentElementSource);

        // console.log("dest B4: ", currentElementDest);
      }
    }
  }
  console.log(
    Math.min(...elements[elements.length - 1]["location"].map((e) => e.num))
  );
  //   console.log(elements[elements.length - 1]["location"].map((e) => e.num));
}
// 214922730
// partOne(input);
partTwo(test);
