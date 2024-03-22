const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.send('This is shop'))

router.get('/about', (req, res) => res.send('This is shop ---> About us'))

router.get('/contact', (req, res) => res.send('This is shop ---> Contact us'))

module.exports = router