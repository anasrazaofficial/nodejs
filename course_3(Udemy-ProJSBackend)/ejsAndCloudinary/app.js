const express = require('express')
const fileUpload = require('express-fileupload')

const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

app.get('/get', (req, res) => {
    // res.status(200).json(req.body) // In postman and in get request, query is treated as body
    res.status(200).json(req.query)   // In browser and in get request, query is treated as query 
})
app.post('/post', (req, res) => {
    console.log(req.files);
    res.status(200).json(req.body)
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