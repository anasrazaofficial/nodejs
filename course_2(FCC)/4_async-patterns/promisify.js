// First approach

const fs = require("fs");
const util = require("util");

const read = util.promisify(fs.readFile)
const write = util.promisify(fs.writeFile)

const start = async () => {
    const first = await read('../3_builtInModules/content/first.txt','utf8')
    const second = await read('../3_builtInModules/content/second.txt','utf8')
    console.log(first);
    console.log(second);
    await write('../3_builtInModules/content/result.txt', `THIS IS AWESOME: ${first}\n${second}`)
}

start()


// Second approach

const fs = require("fs").promises;

const execute = async () => {
    const first = await fs.readFile('../3_builtInModules/content/first.txt', 'utf8')
    const second = await fs.readFile('../3_builtInModules/content/second.txt', 'utf8')
    console.log(first);
    console.log(second);
    await fs.writeFile('../3_builtInModules/content/result.txt', `THIS IS AWESOME: ${first}\n${second}`)
}

execute()