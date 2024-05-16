const express = require('express');
const logger = require('./logger');
const authorize = require('./authorize');
const app = express();

// app.use('/products', logger)
// app.use(logger)
app.use([authorize, logger])

app.get('/', (req, res) => {
    res.send("Home Page")
})
app.get('/about', (req, res) => {
    res.send("About Page")
})
app.get('/contact', (req, res) => {
    res.send("Contact Page")
})
app.get('/gallery', (req, res) => {
    res.send("Gallery Page")
})
app.get('/products/food', (req, res) => {
    res.send("Food Page")
})
app.get('/products/clothes', (req, res) => {
    res.send("Clothes Page")
})
app.get('/users', (req, res) => {
    console.log(res.user);
    res.send("Users Page")
})

app.listen('5000', () => console.log("Server listening on port 5000"))