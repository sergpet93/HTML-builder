const fs = require('node:fs/promises');
const path = require('path');

const options = {withFileTypes: true};
const pathDir = path.join(__dirname, 'secret-folder');

async function getFileName(pathDir, options) {
    try {
        const files =  await fs.readdir(pathDir, options);
        for (let file of files) {
            if (file.isFile()){
                const stats = await fs.stat(path.join(pathDir, file.name));
                const fileName = file.name.split('.');
                console.log(`${fileName[0]} - ${fileName[1]} - ${(stats.size/1024).toFixed(3)}kb`);
            }
        }
    } catch (err) {
        console.error(err);
    }
}

getFileName(pathDir, options);


