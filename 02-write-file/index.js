const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'user-file.txt');
const writableStream = fs.createWriteStream(filePath);
writableStream.on('error', (error) => {
  console.log(`An error occured while writing to the file. Error: ${error.message}`);
});

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Enter a sentence: '
});
readlineInterface.prompt();

let sentence;
readlineInterface.on('line', (line) => {
  switch (line.trim()) {
  case 'exit':
    readlineInterface.close();
    break;
  default:
    sentence = line + '\n';
    writableStream.write(sentence);
    readlineInterface.prompt();
    break;
  }
}).on('close', () => {
  writableStream.end();
  writableStream.on('finish', () => {
    process.stdout.write(`All your sentences are stored in ${filePath}`);
  });
});
