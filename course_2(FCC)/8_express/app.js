const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('../public'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve('../public/index.html'))
})

app.all('*', (req, res) => {
    res.status(404).send('<h1>Page not found</h1><a href="/">Go back to the Home page</a>');
})

app.listen(5000, () => {
    console.log('Server listening on port 5000...');
})