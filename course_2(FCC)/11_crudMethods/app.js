const express = require('express');
const { people } = require('./data');
const app = express();

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))

app.get('/people', (req, res) => {
    res.status(200).json({ success: true, people });
})

app.post('/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(404).json({ success: false, msg: "Please enter a name" })
    }
    res.status(200).json({ success: true, data: [...people] })
});

app.post('/login', (req, res) => {
    const { name } = req.body
    if (name) {
        return res.status(200).send(`<span style="color: green;"> Welcome ${name} </span>`)
    }
    res.status(401).send(`<span style="color: red;"> Please provide your name </span>`)
})

app.listen(5000, () => console.log("Server listening on port 5000"))