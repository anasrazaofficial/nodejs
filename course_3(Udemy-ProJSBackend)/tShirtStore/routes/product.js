const express = require('express')
const { isLoggedIn, isCustomRole } = require('../middlewares/user')
const { addProductByAdmin, getAllProducts, getProductById, getAllProductsByAdmin, updateProductByAdmin, deleteProductByAdmin, addReview, deleteReview } = require('../controllers/product')
const router = express.Router()

router.post('/admin/product/add', isLoggedIn, isCustomRole("admin"), addProductByAdmin)
router.get('/admin/product/get', isLoggedIn, isCustomRole("admin"), getAllProductsByAdmin)
router.put('/admin/product/update/:id', isLoggedIn, isCustomRole("admin"), updateProductByAdmin)
router.delete('/admin/product/delete/:id', isLoggedIn, isCustomRole("admin"), deleteProductByAdmin)

router.get('/product/get', getAllProducts)
router.get('/product/get/:id', getProductById)

// These both are (adding and updating) and deleting the review in the product, that's why we're calling the put method, because the product is updating
router.put('/product/review/add', isLoggedIn, addReview)
router.put('/product/review/delete/:id', isLoggedIn, deleteReview)

module.exports = router