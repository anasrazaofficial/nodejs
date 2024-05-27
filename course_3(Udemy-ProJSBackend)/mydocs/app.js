const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require("fs");
const YAML = require('yaml');

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

app.get("/api/v1/courses/:courseId", (req, res) => {
    const courseById = courses.find(course => course.id === Number(req.params.courseId))
    res.status(200).json(courseById)
})

app.listen(5000, () => console.log("Server listening on port 5000..."))