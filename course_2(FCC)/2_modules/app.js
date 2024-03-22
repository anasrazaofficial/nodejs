// const names = require('./names')
const { name1, name2 } = require('./names')
const printNames = require('./utils')
const items = require('./items')

// printNames(names.name1)
// printNames(names.name2)

printNames(name1)
printNames(name2)

console.log(items);
console.log(items.fruits);
console.log(items.vehicle);