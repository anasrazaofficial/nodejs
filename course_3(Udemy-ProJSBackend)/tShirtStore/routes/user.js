const express = require('express')
const { signup, login, logout, forgotPassword, resetPassword, getLoggedInUser, changePassword, updateUser } = require('../controllers/user')
const { isLoggedIn } = require('../middlewares/user')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)

router.post('/password/forgot', forgotPassword)
router.post('/password/reset/:token', resetPassword)
router.post('/password/update', isLoggedIn, changePassword)

router.get('/user', isLoggedIn, getLoggedInUser)
router.put('/user/update', isLoggedIn, updateUser)

module.exports = router