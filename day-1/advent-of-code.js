const { txt } = require("./input.js");

const numbersEnum = [
  { 1: "one" },
  { 2: "two" },
  { 3: "three" },
  { 4: "four" },
  { 5: "five" },
  { 6: "six" },
  { 7: "seven" },
  { 8: "eight" },
  { 9: "nine" },
];
const lines = txt.split("\n");

const linesResults = [];
let res = 0;
const rgx =
  /(?=(one|two|three|four|five|six|seven|eight|nine|1|2|3|4|5|6|7|8|9))/g;

for (const line of lines) {
  console.log(line);
  let fst, snd;
  // lets extract written nums
  const stuffsFound = [];
  let pointer;
  while ((pointer = rgx.exec(line))) {
    if (pointer.index === rgx.lastIndex) {
      rgx.lastIndex++;
    }
    stuffsFound.push(pointer[1]);
  }

  console.log(stuffsFound);
  if (stuffsFound) {
    for (const stuff of stuffsFound) {
      const isNumber = !Number.isNaN(parseInt(stuff));
      let num;
      if (isNumber) {
        num = parseInt(stuff);
      } else {
        num = parseInt(
          Object.keys(
            numbersEnum.find((e) => Object.values(e)[0] === stuff)
          )[0][0]
        );
      }
      if (!fst) {
        fst = num;
      } else {
        snd = num;
      }
    }
    if (typeof fst === "number" && typeof snd === "number") {
      linesResults.push(parseInt(`${fst}${snd}`));
    } else {
      linesResults.push(parseInt(`${fst}${fst}`));
    }
  }
}
linesResults.forEach((e) => {
  res += e;
});

console.log(res);
