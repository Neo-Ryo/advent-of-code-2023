#!/bin/bash

currDirr="day-$1"
mkdir -p $currDirr
cd $currDirr
touch index.ts
touch input.txt
touch test.txt
echo 'import { readFileSync } from "fs";' > index.ts
echo 'const input = readFileSync("./day-${$1}/input.txt").toString();' >> index.ts
echo 'const test = readFileSync("./day-${$1}/test.txt").toString();' >> index.ts
echo 'function one(input: string) {}' >> index.ts
