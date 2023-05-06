const {readdir} = require('fs/promises');
const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'styles');
const bundleCssFilePath = path.join(__dirname, 'project-dist', 'bundle.css');
const writableStream = fs.createWriteStream(bundleCssFilePath, {encoding: 'utf8'});

writableStream.on('error', (error) => {
  console.log(`An error occured while writing to the file. Error: ${error.message}`);
});

const mergeStyles = async () => {
  const files = await readdir(folderPath, {withFileTypes: true});
  const styleFiles = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.isFile() && path.extname(file.name) === '.css') {
      styleFiles.push(file);

    }
  }

  styleFiles.forEach((file, idx) => {
    const readStream = fs.createReadStream(path.join(folderPath, file.name), {encoding: 'utf8'});

    readStream.on('data', (chunk) => {
      writableStream.write(chunk);
    }).on('error', (error) => {
      console.log(`An error occured while reading the file. Error: ${error.message}`);
    });

    if (idx === styleFiles.length - 1) {
      readStream.on('end', () => {
        writableStream.end();
        writableStream.on('finish', () => {
          console.log('Style merge completed successfully');
        });
      });
    }
  });
};

mergeStyles();
