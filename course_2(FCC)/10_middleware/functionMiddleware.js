const express = require('express');
const logger = require('./logger');
const app = express();

// app.use('/products', logger)
app.use(logger)

app.get('/', (req, res) => {
    res.send("Home Page")
})
app.get('/about', (req, res) => {
    res.send("about Page")
})
app.get('/contact', (req, res) => {
    res.send("contact Page")
})
app.get('/gallery', (req, res) => {
    res.send("gallery Page")
})
app.get('/products/food', (req, res) => {
    res.send("food Page")
})
app.get('/products/clothes', (req, res) => {
    res.send("clothes Page")
})

app.listen('5000', () => console.log("Server listening on port 5000"))