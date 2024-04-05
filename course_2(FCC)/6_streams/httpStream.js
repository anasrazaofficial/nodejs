const fs = require("fs");
const http = require("http");

http.createServer((req, res) => {
    const stream = fs.createReadStream('../content/big-file.txt', { encoding: 'utf8' })

    stream.on('open', () => stream.pipe(res))
    stream.on('error', err => res.end(err))

}).listen(5000)