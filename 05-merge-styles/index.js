const fs = require('node:fs/promises');
const path = require('path');
const fs_1 = require('fs');

const options = {withFileTypes: true};
const pathDir = path.join(__dirname, 'styles');

const writefile = fs_1.createWriteStream(path.join(__dirname, 'project-dist/bundle.css'));

async function getFileCSS(pathDir, options) {
    try {
        const files =  await fs.readdir(pathDir, options);
        for (let file of files) {
            if (file.isFile() && file.name.split('.')[1].toLowerCase() === 'css'){
                const readfile = fs_1.createReadStream(path.join(pathDir, file.name), 'utf-8');
                readfile.on('data', chunk => writefile.write(chunk + '\n'));
            }
        }
    } catch (err) {
        console.error(err);
    }
}

getFileCSS(pathDir, options);