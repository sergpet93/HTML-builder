const fs = require('fs');
const path = require('path');
const readfile = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
readfile.on('data', chunk => console.log(chunk));