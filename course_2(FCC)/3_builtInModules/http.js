const http = require('http')

const server = http.createServer((req, res) => {
    // res.write('Hello world')
    // res.end()

    if (req.url === '/') {
        res.write('Hey! This is home page')
        res.end()
    }
    if (req.url === '/asd') {
        res.write('Hey! This is about page')
        res.end()
    }
    res.end(`<h1>OOPS!</h1><p>There is no such page as ${req.url}</p><a href="/">Back to homepage</a>`)
})

server.listen(5000)