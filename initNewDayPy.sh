#!/bin/bash

currDirr="day-$1"
mkdir -p $currDirr
cd $currDirr
touch index.py
touch input.txt
touch test.txt
echo 'with open("day-xx/test.txt") as f:
' > index.py
echo '    test = f.read()
' >> index.py
echo 'with open("day-xx/input.txt") as f:
' >> index.py
echo '    inputFile = f.read()
' >> index.py
