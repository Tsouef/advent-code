const fs = require("fs");
const path = require("path");

const fileContents = fs.readFileSync(path.resolve(__dirname, "./data.txt"), "utf8");
const lines = fileContents.split("\n");

const wordToNumber = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  oneight: 18,
  twone: 21,
  eightwo: 82,
  seveneight: 78,
};

function splitLargeNumbers(number) {
  return Array.from(String(number), Number);
}

const pattern = /(?:[0-9]|oneight|twone|seveneight|eightwo|one|two|three|four|five|six|seven|eight|nine)/g;
let total = 0;

for (const line of lines) {
  const wordsAndNumbers = line.match(pattern);

  const onlyNumbers = wordsAndNumbers.map((word) => wordToNumber[word.toLowerCase()] || parseInt(word, 10));
  const resultArray = [].concat(...onlyNumbers.map(splitLargeNumbers));

  const firstNumber = resultArray[0];
  const lastNumber = resultArray[resultArray.length - 1];

  const finalNumber = `${firstNumber}${lastNumber}`;

  total += Number(finalNumber);
}

console.log(total);
