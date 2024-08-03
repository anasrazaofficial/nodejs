const express = require('express')
const router = express.Router()

const { isLoggedIn } = require('../middlewares/user')
const handleStripePayment = require('../controllers/payment')

router.post('/stripe', isLoggedIn, handleStripePayment)

module.exports = router