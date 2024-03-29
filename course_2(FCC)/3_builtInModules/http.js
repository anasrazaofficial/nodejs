const http = require('http')

const server = http.createServer((req, res) => {
    // res.write('Hello world')
    // res.end()

    if (req.url === '/') {
        // res.write('Hey! This is home page')
        res.end('Hey! This is home page')
    } else if (req.url === '/about') {
        // res.write('Hey! This is about page')
        res.end('Hey! This is about page')
    } else {
        res.end(`<h1>OOPS!</h1><p>There is no such page as ${req.url.split("/")[1]}</p><a href="/">Back to homepage</a>`)
    }
})

server.listen(5000, () => console.log('Server listening on port 5000'))