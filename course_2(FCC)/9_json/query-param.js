const express = require('express');
const { products } = require('./data')
const app = express();


app.get('/', (req, res) => res.send("<h1>Welcome to my application</h1><a href='/api/products'>Products</a>"))

app.get('/api/products', (req, res) => {
    const newProds = products.map(product => {
        const { id, title, price, image } = product
        return { id, title, price, image }
    })
    res.json(newProds)
})

app.get('/api/products/:productID', (req, res) => {
    const newProd = products.find(product => product.id === Number(req.params.productID))
    if (!newProd) res.status(404).send('<h1>Error 404</h1>Product Not Found')
    res.status(200).json(newProd)
})

app.listen(5000, () => console.log('Server listening on port 5000'))