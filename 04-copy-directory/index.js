const fs = require('node:fs/promises');
const path = require('path');

const pathFiles = path.join(__dirname, 'files');
const pathCopyFiles = path.join(__dirname, 'files-copy');
const options = {withFileTypes: true};

async function getCopyFiles(pathFiles, pathCopyFiles, options){
    try {
        await fs.rm(pathCopyFiles, {force: true, recursive: true});
        await fs.mkdir(pathCopyFiles);
        const files =  await fs.readdir(pathFiles, options);
        for (let file of files) {
            if(file.isDirectory()){
                getCopyFiles(path.join(pathFiles, file.name), path.join(pathCopyFiles, file.name), options)
            }
            else{
                await fs.copyFile(path.join(pathFiles, file.name), path.join(pathCopyFiles, file.name));
            }
        }
    } catch (err) {
        console.error(err.message);
    }
}

getCopyFiles(pathFiles, pathCopyFiles, options);