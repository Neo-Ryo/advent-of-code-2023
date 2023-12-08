function getNums(input) {
  const rgx =
    /(?=(one|two|three|four|five|six|seven|eight|nine|1|2|3|4|5|6|7|8|9))/g;
  const stuffsFound = [];
  let pointer;
  while ((pointer = rgx.exec(input))) {
    console.log(pointer);
    console.log(rgx.lastIndex);
    if (pointer.index === rgx.lastIndex) {
      rgx.lastIndex++;
      console.log(rgx.lastIndex);
    }
    stuffsFound.push(pointer[1]);
  }
}

const txt = `"hjqjwhonetwoneightkljhdkj"`;

getNums(txt);
