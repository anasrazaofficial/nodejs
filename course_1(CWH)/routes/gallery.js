const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.send('This is Gallery'))

router.get('/images', (req, res) => res.send('This is Gallery ---> Images'))

router.get('/contact', (req, res) => res.send('This is Gallery ---> Contact us'))

module.exports = router