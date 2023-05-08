const fs = require('node:fs/promises');
const path = require('path');
const fs_1 = require('fs');

const pathDirProject = path.join(__dirname, "project-dist");
const pathDirAssets = path.join(__dirname, "assets");
const pathDirTemp = path.join(__dirname, "template.html");
const pathDirStyle = path.join(__dirname, "styles");
const pathDirComp = path.join(__dirname, "components");
const options = {withFileTypes: true};

async function createHtmlPage(){
    try {
        const writeFile =  await fs_1.createWriteStream(path.join(pathDirProject, "index.html"));
        let data = (await fs.readFile(pathDirTemp)).toString();
        const files =  await fs.readdir(pathDirComp, options);
        for (let file of files){
            if(file.isFile()){
                const dataFile = (await fs.readFile(path.join(pathDirComp, file.name))).toString();
                data = data.replace(`{{${file.name.split('.')[0]}}}`, dataFile)
            }
        }
        writeFile.write(data);
    } catch (err) {
        console.error(err);
    }
}

async function getCopyFiles(pathFiles, pathCopyFiles){
    try {
        await fs.rm(pathCopyFiles, {force: true, recursive: true});
        await fs.mkdir(pathCopyFiles);
        const files =  await fs.readdir(pathFiles, options);
        for (let file of files) {
            if(file.isDirectory()){
                getCopyFiles(path.join(pathFiles, file.name), path.join(pathCopyFiles, file.name))
            }
            else{
                await fs.copyFile(path.join(pathFiles, file.name), path.join(pathCopyFiles, file.name));
            }
        }
    } catch (err) {
        console.error(err.message);
    }
}

async function getFileCSS(pathDir) {
    try {
        const writefile = fs_1.createWriteStream(path.join(pathDirProject, "style.css"));
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

async function createProject(){
    await fs.rm(pathDirProject, {force: true, recursive: true});
    await fs.mkdir(pathDirProject);
    createHtmlPage();
    getCopyFiles(pathDirAssets, path.join(pathDirProject, "assets"));
    getFileCSS(pathDirStyle);

}

createProject()