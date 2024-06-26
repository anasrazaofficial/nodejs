const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const swaggerUi = require('swagger-ui-express');
const fs = require("fs");
const YAML = require('yaml');

const home = require('./routes/home')

const app = express()
const file = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file);

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(fileUpload())
app.use(morgan("tiny"))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', home)

// Exporting app
module.exports = app