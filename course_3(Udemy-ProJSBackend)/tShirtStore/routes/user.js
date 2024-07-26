const express = require('express')
const { signup, login, logout, forgotPassword } = require('../controllers/user')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.post('/password/forgot', forgotPassword)

module.exports = router