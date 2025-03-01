const readline = require("readline");
const fs = require("fs");

// Reading Writing data
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`What's your name?: `, (name) => {
  console.log(`Hi ${name}!`);
  rl.close();
});

rl.on("close", () => {
  console.log("Input interface closed");
  process.exit(0);
});

// Reading Writing files
const textIn = fs.readFileSync("./files/input.txt", "utf-8");
console.log(textIn);

//writing
let content = `Data Read from input.txt: ${textIn}. \nDate Created: ${new Date()}`;
fs.writeFileSync("./files/output.txt", content);

//reading async
fs.readFile("./files/input.txt", "utf-8", (err, data) => {
  console.log(`data read ${data}`);
});

console.log("Reading Input...");
