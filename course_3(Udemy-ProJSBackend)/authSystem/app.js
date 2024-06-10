require('dotenv').config() // This means that from dotenv object `config()` method is called
require('./config/database').connect()
const express = require('express');
const User = require('./model/user')

const app = express();

app.get('/', (req, res) => {
    res.status(200).send("Welcome!")
})

app.post('/addUser', async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    if (!(firstName && lastName && email && password)) {
        res.status(400).send("All fields are required!")
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        res.status(401).send("User already exists!")
    }
})

module.exports = app