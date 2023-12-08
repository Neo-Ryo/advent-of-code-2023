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

// 4,5,6,7 --- 17,18,19...26 --- 30,31,32
let a: NumAndRange[] = [
  { num: 15, range: 15 },
  { num: 3, range: 33 },
  { num: 30, range: 3 },
];

// source 4... 24
let b = { dest: 10, source: 5, lgt: 20 };
let dest: NumAndRange[] = [];

console.log(rangeComparator(a[1], b));
