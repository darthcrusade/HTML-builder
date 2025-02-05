const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'));

let data = '';
readStream.on('data', (chunk) => {
  data += chunk;
}).on('end', function() {
  process.stdout.write(data);
});
