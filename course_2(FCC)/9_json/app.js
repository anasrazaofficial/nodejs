const express = require('express')
const { products, users } = require('./data')
const app = express()

app.get('/', (req, res) => res.send('<a href="/fruits">Fruits</a><br><a href="/products">Products</a><br><a href="/users">Users</a>'))
    .get('/fruits', (req, res) => res.json([{ name: 'mango' }, { name: 'apple' }, { name: 'melon' }, { name: 'grape' }]))
    .get('/products', (req, res) => res.json(products))
    .get('/users', (req, res) => res.json(users))


app.listen(5000, () => console.log('listening on port 5000'))