const { writeFileSync } = require("fs");

for (let i = 0; i < 1000; i++) {
    writeFileSync('../content/big-file.txt', `HEllo world\t${i}\n`, { flag: 'a' });
}