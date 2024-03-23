const fs = require('fs')

const readFile1 = fs.readFileSync('./content/first.txt', 'utf-8');
const readFile2 = fs.readFileSync('./content/second.txt', 'utf-8');

console.log('Start');

fs.writeFileSync('./content/result-sync.txt', `Here is the result for sync: ${readFile1}, ${readFile2}`, { flag: 'a' });
console.log(fs.readFileSync('./content/result-sync.txt', 'utf-8'));

console.log('End');