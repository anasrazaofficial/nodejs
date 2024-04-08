const http = require('http');

const server = http.createServer((req, res) => {
    // res.writeHead(200, { 'content-type': 'text/plain' })
    console.log('Server started');
    if (req.url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write("<h1>Home page</h1>")
    } else if (req.url === '/about') {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write("<h1>About page</h1>")
    } else if (req.url === '/contact') {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write("<h1>Contact page</h1>")
    } else {
        res.writeHead(404, { 'content-type': 'text/html' })
        res.write("<h1>Page not found</h1><a href='/'>Go to the homepage</a>")
    }
    res.end();
})

server.listen(5000);