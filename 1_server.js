const express = require('express')
const shop = require('./routes/shop')
const gallery = require('./routes/gallery')

const app = express()
const port = 3000

app.use(express.static('public'))
app.use('/shop', shop)
app.use('/gallery', gallery)

app.get('/', (req, res) => {
  res.send('Hello World!')
}).get('/about', (req, res) => {
  res.send('about us')
}).get('/contact', (req, res) => {
  res.send('Contact us')
}).get('/blog', (req, res) => {
  res.send('My blogs')
}).get('/blog/:slug', (req, res) => {
  console.log(req.params);
  console.log(req.query);
  res.send(`Hey 👋! This blog is about ${req.params.slug}`)
})

app.get('/index', (req, res) => {
  console.log('Hey! This is index');
  res.sendFile('templates/index.html', { root: __dirname })
})

app.get('/api', (req, res) => {
  res.json({
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      city: "Gwenborough",
    },
    phone: "1-770-736-8031 x56442",
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})