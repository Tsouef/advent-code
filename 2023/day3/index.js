const fs = require("fs");
const path = require("path");

const fileContents = fs.readFileSync(path.resolve(__dirname, "./data.txt"), "utf8");
const lines = fileContents.split("\n");

const regexSymbol = /[^\w\d. ]/g;
const regexNumber = /\d+/g;

let arraySymbol = [];
let arrayNumber = [];

let result = [];
let gears = [];

for (const line of lines) {
  const symbolArray = line.matchAll(regexSymbol);
  const numberArray = line.matchAll(regexNumber);
  const lineIndex = lines.indexOf(line) + 1;

  for (const symbol of symbolArray) {
    const symbolIndex = symbol.index + 1;
    const symbolValue = symbol[0];

    arraySymbol.push({ symbolValue, lineIndex, symbolIndex });
  }

  for (const number of numberArray) {
    const numberIndex = number.index + 1;
    const numberValue = number[0];

    arrayNumber.push({ numberValue, lineIndex, numberIndex });
  }
}

for (const symbol of arraySymbol) {
  const lineIndex = symbol.lineIndex;
  const symbolIndex = symbol.symbolIndex;

  const getNumbers = (lineIndex, symbolIndex) => {
    const numbers = arrayNumber.filter((number) => {
      return number.lineIndex === lineIndex || number.lineIndex === lineIndex + 1 || number.lineIndex === lineIndex - 1;
    });

    const numberValid = numbers.filter((number) => {
      const numberOfDigits = number.numberValue.length - 1;

      if (number.numberIndex < symbolIndex) {
        return (
          number.numberIndex + numberOfDigits === symbolIndex ||
          number.numberIndex + numberOfDigits === symbolIndex + 1 ||
          number.numberIndex + numberOfDigits === symbolIndex - 1
        );
      }

      if (number.numberIndex >= symbolIndex) {
        return (
          number.numberIndex === symbolIndex ||
          number.numberIndex === symbolIndex + 1 ||
          number.numberIndex === symbolIndex - 1
        );
      }
    });

    if (symbol.symbolValue === "*" && numberValid.length === 2) {
      const gearNumber = parseInt(numberValid[0].numberValue) * parseInt(numberValid[1].numberValue);
      gears.push(gearNumber);
    }

    return numberValid.map((number) => {
      result.push(number.numberValue);
    });
  };

  getNumbers(lineIndex, symbolIndex);
}

const sum = result.reduce((a, b) => parseInt(a) + parseInt(b), 0);
const gearsSum = gears.reduce((a, b) => parseInt(a) + parseInt(b), 0);
console.log({ sum });
console.log({ gearsSum });
