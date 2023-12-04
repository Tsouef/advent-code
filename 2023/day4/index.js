const fs = require("fs");
const path = require("path");

const fileContents = fs.readFileSync(path.resolve(__dirname, "./data.txt"), "utf8");
const lines = fileContents.split("\n");

let sum = 0;
const cardCounts = new Array(lines.length).fill(1);

for (const line of lines) {
  const [game, numbers] = line.split(":");
  const [winningNumbers, numbersToCheck] = numbers.split("|").map((str) => str.trim().split(/\s+/).map(Number));

  const index = lines.indexOf(line);
  const numberValids = winningNumbers.filter((number) => numbersToCheck.includes(number));

  if (numberValids.length > 0) {
    for (let j = 1; j <= numberValids.length; j++) {
      if (cardCounts[index + j]) {
        cardCounts[index + j] += cardCounts[index];
      }
    }
  }

  sum += numberValids.length > 0 ? Math.pow(2, numberValids.length - 1) : 0;
}

result = cardCounts.reduce((a, b) => a + b, 0);

console.log({ sum });
console.log({ result });
