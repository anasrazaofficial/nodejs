const express = require('express')
const { isLoggedIn, isCustomRole } = require('../middlewares/user')
const { addProduct, getAllProducts, getProductById, getAllProductsByAdmin } = require('../controllers/product')
const router = express.Router()

router.post('/add', isLoggedIn, isCustomRole("admin"), addProduct)
router.get('/admin/get', isLoggedIn, isCustomRole("admin"), getAllProductsByAdmin)

router.get('/getAll', getAllProducts)
router.get('/getAll', getProductById)

module.exports = router