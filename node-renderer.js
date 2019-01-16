const readline = require("readline");
const snakeGame = require("./snake");
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const paint = game => {
  process.stdout.write("\033c");
  game.forEach(row => {
    let cols = "";
    row.forEach(col => (cols += (col === 0 ? "." : col) + " "));
    console.log(cols);
  });
};

snakeGame(
  handler => process.stdin.on("keypress", (_, key) => handler(key.name)),
  ["up", "down", "left", "right"],
  paint
);
