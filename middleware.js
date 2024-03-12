const express = require('express')
const app = express()
const port = 3000


app.use((req, res, next) => {
    console.log('m1');
    next()
})

app.use((req, res, next) => {
    console.log('m2');
    req.me = "I am Anas"
    next()
})

app.get('/', (req, res) => {
    res.send('Hello World! ' + req.me)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})