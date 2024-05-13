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
    if (!newProd) {
        return res.status(404).send('<h1>Error 404</h1>Product Not Found')
    }
    res.status(200).json(newProd)
})

app.get('/api/users', (req, res) => {
    console.log(req.query)
    res.send("Hello world!")
})

app.get('/api/v1/query', (req, res) => {
    const { search, limit } = req.query
    let sortedProducts = [...products].filter(product => search ? product.title.startsWith(search) : null)
    if (sortedProducts.length < 1) {
        return res.status(200).send('No products found')
    }
    if (limit) sortedProducts = sortedProducts.slice(0, Number(limit))
    res.status(200).json(sortedProducts)

})

app.listen(5000, () => console.log('Server listening on port 5000'))