const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require("fs");
const YAML = require('yaml');

const app = express();

const file = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
    res.status(200).send("Hello, world!");
})

app.listen(5000, () => console.log("Server listening on port 5000..."))