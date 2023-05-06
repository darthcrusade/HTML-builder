const {readdir, stat} = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

const convertBytes = (bytes) =>{
  const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb'];
  const k = 1024;
  if (bytes === 0) {
    return 'n/a';
  }
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  if (i === 0) {
    return bytes + ' ' + sizes[i];
  }
  return (bytes / Math.pow(k, i)).toFixed(3) + sizes[i];
};

const getFolderData = async () => {
  try {
    const files = await readdir(folderPath, {withFileTypes: true});
    files.forEach(file => {
      if (file.isFile()) {
        stat(path.join(folderPath, file.name)).then((resolvedStat) => {
          const data = {
            size: convertBytes(resolvedStat.size),
            name: path.basename(file.name, path.extname(file.name)),
            fileExt: path.extname(file.name)?.split('.')[1]
          };

          process.stdout.write(`${data.name} - ${data.fileExt} - ${data.size} \n`);
        });
      }
    });
  } catch(err) {
    console.log(err);
  }
};

getFolderData();
