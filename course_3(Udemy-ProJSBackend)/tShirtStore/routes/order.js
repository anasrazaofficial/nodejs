const express = require('express')
const router = express.Router()

const { isLoggedIn, isCustomRole } = require('../middlewares/user')
const { createOrder, getOrder, getAllOrdersOfLoggedIn, getAllOrdersByAdmin, completeOrderByAdmin, deleteOrderByAdmin } = require('../controllers/order')

router.post('/order/create', isLoggedIn, createOrder)
router.get('/order/myOrders', isLoggedIn, getAllOrdersOfLoggedIn)
router.get('/order/:id', isLoggedIn, getOrder)

router.get('/admin/orders', isLoggedIn, isCustomRole("admin"), getAllOrdersByAdmin)
router.put('/admin/order/:id', isLoggedIn, isCustomRole("admin"), completeOrderByAdmin)
router.delete('/admin/order/:id', isLoggedIn, isCustomRole("admin"), deleteOrderByAdmin)

module.exports = router