const http = require('http');
const fs = require('fs');

const homepage = fs.readFileSync('./index.html')
const homeCss = fs.readFileSync('./style.css')

const server = http.createServer((req, res) => {
    // res.writeHead(200, { 'content-type': 'text/plain' })
    console.log('Server started');
    if (req.url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write(homepage)
    } else if (req.url === '/style.css') {
        res.writeHead(200, { 'content-type': 'text/css' })
        res.write(homeCss)
    } else {
        res.writeHead(404, { 'content-type': 'text/html' })
        res.write("<h1>Page not found</h1><a href='/'>Go to the homepage</a>")
    }
    res.end();
})

server.listen(5000);