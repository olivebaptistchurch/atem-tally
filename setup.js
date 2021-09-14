'use strict';
const fs = require('fs');
const readline = require('readline');
const fileName = './config.json';
const loop = true;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const updateConfig = (configCallback) => {
  rl.question('What do you think of Node.js? ', (answer) => {
    // TODO: Log the answer in a database
    console.log(`Thank you for your valuable feedback: ${answer}`);

    rl.close();
    loop = false;
  });
};

while (loop) {}

let data = fs.readFileSync(fileName);
let config = JSON.parse(data);

config.relaySettings['4'] = {
  id: '4',
  cameraInput: 6,
  relayOutput: 1,
};

fs.writeFile(fileName, JSON.stringify(config, null, 2), (err) => {
  if (err) throw err;
});
