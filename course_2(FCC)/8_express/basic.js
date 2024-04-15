const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log('User hit the request');
    res.status(200).send('Welcome to the Home page')
    // res.status(200).send('<h1>Welcome to the Home page</h1>')
})

app.get('/about', (req, res) => {
    res.status(200).send('About page');
})

app.all('*', (req, res) => {
    res.status(404).send('<h1>Page not found</h1><a href="/">Go back to the Home page</a>');
})

app.listen(5000, () => {
    console.log('Server listening on port 5000...');
})