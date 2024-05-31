const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require("fs");
const YAML = require('yaml');
const fileUpload = require('express-fileupload');

const app = express();
const file = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file);
const courses = [
    {
        id: 1,
        name: "Learn React",
        price: 267
    },
    {
        id: 2,
        name: "Learn NextJs",
        price: 852
    },
    {
        id: 3,
        name: "Learn NodeJS",
        price: 802
    },
]

//! Middlewares
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json()) // This line tells that the data in in JSON format
app.use(fileUpload()) // If file upload comes up, it adds file object in request object.i.e, `req.file`

app.get("/", (req, res) => {
    res.status(200).send("Hello, world!");
})

app.get("/api/v1/hello", (req, res) => {
    res.status(200).send("Hello, world!");
})

app.get("/api/v1/object", (req, res) => {
    res.status(200).json(courses[0])
})

app.get("/api/v1/courses", (req, res) => {
    res.status(200).json(courses)
})

// Url parameters
app.get("/api/v1/courses/:courseId", (req, res) => {
    const courseById = courses.find(course => course.id === Number(req.params.courseId))
    res.status(200).json(courseById)
})

// Post
app.post("/api/v1/addCourse", (req, res) => {
    console.log(req.body);
    courses.push(req.body)
    res.status(200).send(true)
})

// Query params (https://....?abc=12&xyz=44...)
app.get("/api/v1/courseQuery", (req, res) => {
    const location = req.query.location
    const device = req.query.device
    res.status(200).send({ location, device })
})

// Image upload
app.post("/api/v1/upload", (req, res) => {
    console.log(req.headers);
    const file = req.files.file
    const path = __dirname + "/images/" + Date.now() + ".jpg"
    file.mv(path, (err) => res.send(true))
    res.status(true)
})

app.listen(5000, () => console.log("Server listening on port 5000..."))