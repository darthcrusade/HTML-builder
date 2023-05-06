const {mkdir, rmdir, readdir, copyFile} = require('fs/promises');
const path = require('path');

const filesFolderPath = path.join(__dirname, 'files');
const filesCopyFolderPath = path.join(__dirname, 'files-copy');


const copyFolder = async () => {
  try {
    await rmdir(filesCopyFolderPath, {recursive: true});
    await mkdir(filesCopyFolderPath, {recursive: true});
    const files = await readdir(filesFolderPath);

    for (let i = 0; i < files.length; i++) {
      await copyFile(path.join(filesFolderPath, files[i]), path.join(filesCopyFolderPath, files[i]));
    }
  } catch(err) {
    console.log(err);
  }
};

copyFolder();
