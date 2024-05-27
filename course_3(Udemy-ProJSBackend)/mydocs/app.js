const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require("fs");
const YAML = require('yaml');

const app = express();

const file = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file);

const courses = [
    {
        id: "LP72ZW4H07848281910542336",
        name: "Learn React",
        price: 267
    },
    {
        id: "RM89GHYZ2802224208019456",
        name: "Learn React",
        price: 852
    },
    {
        id: "XS89KMC70003689201398710272",
        name: "Learn React",
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

app.listen(5000, () => console.log("Server listening on port 5000..."))