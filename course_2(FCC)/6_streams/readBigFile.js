const { createReadStream } = require("fs");

const stream = createReadStream('../cotent/big-file.txt', { encoding: 'utf8' })

// 1st Way
stream.on('data', (res) => console.log(res))
stream.on('error', (err) => console.log(err))

// 2nd Way
stream.on('data', (res) => console.log(res)).on('error', (err) => console.log(err))