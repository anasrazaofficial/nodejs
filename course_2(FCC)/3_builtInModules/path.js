const path = require('path')

console.log(path.sep);

const filePath = path.join('/course_2(FCC)', '3_builtInModules', 'path.js')
console.log(filePath);

const basePath = path.basename(filePath)
console.log(basePath);

const absolutePath = path.resolve(__dirname, 'course_2(FCC)', '3_builtInModules', 'path.js')
console.log(absolutePath);