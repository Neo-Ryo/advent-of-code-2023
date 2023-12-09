#!/bin/bash

currDirr="day-$1"
mkdir $currDirr
cd $currDirr
touch index.ts
touch input.txt
touch test.txt
echo 'import { readFileSync } from "fs";' > index.ts
echo 'const input = readFileSync("./day-8/input.txt").toString();' >> index.ts
echo 'const test = readFileSync("./day-8/test.txt").toString();' >> index.ts
