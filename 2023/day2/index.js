const fs = require("fs");
const path = require("path");

const fileContents = fs.readFileSync(path.resolve(__dirname, "./data.txt"), "utf8");
const lines = fileContents.split("\n");
const pattern = /(\d+) (\w+),?/g;

let totalGames = 0;

let maxCounts = {};
let maxPower = 0;
let power = 0;

for (const line of lines) {
  const index = lines.indexOf(line) + 1;
  const gameParts = line.split(";");

  let isAgoodGame = true;

  for (const game of gameParts) {
    const counts = { id: index, red: 0, green: 0, blue: 0 };
    const matchArray = game.matchAll(pattern);

    for (const match of matchArray) {
      const count = parseInt(match[1]);
      const color = match[2];
      counts[color] += count;
    }

    if (!maxCounts[index]) {
      maxCounts[index] = { red: 0, green: 0, blue: 0 };
    }
    maxCounts[index].red = Math.max(maxCounts[index].red, counts.red);
    maxCounts[index].green = Math.max(maxCounts[index].green, counts.green);
    maxCounts[index].blue = Math.max(maxCounts[index].blue, counts.blue);

    power = (maxCounts[index].red || 1) * (maxCounts[index].green || 1) * (maxCounts[index].blue || 1);

    if (counts.red > 12 || counts.green > 13 || counts.blue > 14) {
      isAgoodGame = false;
    }
  }

  if (isAgoodGame) {
    totalGames += index;
  }

  maxPower += power;
}

console.log("TOTAL:", totalGames);

console.log("POWER:", maxPower);
