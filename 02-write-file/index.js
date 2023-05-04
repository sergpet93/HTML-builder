const path = require('path');
const fs = require('fs');
const readline = require('readline');
const {stdout:output, stdin:input} = process;

const writefile = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const rl = readline.createInterface({ input, output });
rl.write('Enter the text \n');
rl.on('line', (input) => {
    if (input.toLowerCase().trim() === 'exit'){
        rl.write('bye! \n');
        rl.close();
    }
    else{
        writefile.write(input + '\n');
    }
}); 
rl.on('SIGINT', () =>{
    rl.write('bye! \n');
    rl.close();
})