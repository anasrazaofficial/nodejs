const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.listen(5000, () => console.log('Server listening on port 5000'))