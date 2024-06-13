const express = require('express')
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2

const app = express()

cloudinary.config({
    cloud_name: "dlqjthwo5",
    api_key: "841316358199787",
    api_secret: "jD1L2Pd5IuVnCKDuSgPIYAJXbt4"
})

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
app.post('/post', async (req, res) => {

    // ### Use case for multiple images
    let imageArray = [], results = []

    if (req.files) {
        for (let index = 0; index < req.files.sampleFile.length; index++) {
            let result = await cloudinary.uploader.upload(req.files.sampleFile[index].tempFilePath, {
                folder: "users"
            })
            results.push(result)
            imageArray.push({
                public_id: result.public_id,
                secure_url: result.secure_url
            })
        }
    }


    // ### Use case for one image
    // let file = req.files.sampleFile
    // let result = await cloudinary.uploader.upload(file.tempFilePath, { folder: 'users' })


    let details = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        result: results,
        images: imageArray
    }
    console.log(details);
    res.status(200).json(details)
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