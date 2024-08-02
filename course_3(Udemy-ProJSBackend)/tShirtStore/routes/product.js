const express = require('express')
const { isLoggedIn, isCustomRole } = require('../middlewares/user')
const { addProduct, getAllProducts } = require('../controllers/product')
const router = express.Router()

router.post('/add', isLoggedIn, isCustomRole("admin"), addProduct)
router.get('/getAll', getAllProducts)

module.exports = router