const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded())

app.get('/getforminurl', (req, res) => {
    // res.status(200).json(req.body) // In postman, query is treated as body
    res.status(200).json(req.query)   // In browser, query is treated as query 
})

app.get('/getform', (req, res) => {
    res.render('getform')
})
app.get('/postform', (req, res) => {
    res.render('postform')
})

app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})

