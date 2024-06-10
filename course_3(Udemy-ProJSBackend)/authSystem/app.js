require('dotenv').config() // This means that from dotenv object `config()` method is called
require('./config/database').connect()

const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./model/user')
const { SECRET_KEY } = process.env

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send("Welcome!")
})

app.post('/addUser', async (req, res) => {
    // Since we are getting promises in the try block, so that's why we wrap it in trycatch
    try {

        const { firstName, lastName, email, password } = req.body
        if (!(firstName && lastName && email && password)) {
            res.status(400).send("All fields are required!")
        }

        const existingUser = await User.findOne({ email }) // Database Operation so making it asynchronous
        if (existingUser) {
            res.status(401).send("User already exists!")
        }

        const encryptedPassword = await bcrypt.hash(password, 10) // Sometimes it takes time so putting await is better
        let user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        // Creating Token
        const token = jwt.sign(
            { user_id: user._id, email },
            SECRET_KEY,
            { expiresIn: "2h" }
        )
        user.token = token
        user.password = undefined   // Password will not be shown in response

        res.status(201).send(user)

    } catch (error) {
        console.log(error);
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!(email && password)) {
            res.status(400).send("Field is missing or Fields are missing")
        }

        const user = await User.findOne({ email })
        if (user && bcrypt.compare(email, user.email)) {
            const token = jwt.sign(
                { user_id: user.id, email },
                SECRET_KEY,
                { expiresIn: "2h" }
            )
            user.token = token
            user.password = undefined

            return res.status(200).json(user)
        }

        return res.status(400).send("Invalid credentials")

    } catch (error) {
        console.log(error);
    }
})

module.exports = app