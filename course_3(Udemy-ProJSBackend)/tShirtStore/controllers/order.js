const Order = require('../models/order')
const Product = require('../models/product')
const promise = require('../middlewares/promise')
const CustomError = require('../utils/customError')
const product = require('../models/product')

const createOrder = promise(async (req, res, next) => {
    const order = await Order.create({ ...req.body, user: req.user._id })

    return res.status(200).json({
        success: true,
        order
    })
})

const getOrder = promise(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'username email')
    if (!order) {
        return next(new CustomError("Please check order id", 401))
    }

    return res.status(200).json({
        success: true,
        order
    })
})

const getAllOrdersOfLoggedIn = promise(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })

    if (!orders) {
        return next(new CustomError("No such orders found for this user", 401))
    }

    return res.status(200).json({
        success: true,
        orders
    })
})


/// Admin routes
const getAllOrdersByAdmin = promise(async (req, res, next) => {
    const orders = await Order.find()

    return res.status(200).json({
        success: true,
        orders
    })
})

const completeOrderByAdmin = promise(async (req, res, next) => {
    let order = await Order.findById(req.params.id)
    if (!order) {
        return next(new CustomError("Order may have been deleted, or the order order id is invalid", 401))
    }

    if (order.orderStatus !== "pending") {
        return next(new CustomError("This order is not pending", 401))
    }

    order.orderStatus = "delivered"
    order.deliveredAt = Date.now()

    for (let i = 0; i < order.orderItems.length; i++) {
        let product = await Product.findById(order.orderItems[i].product)
        product.stock -= order.orderItems[i].quantity
        await product.save({ validateBeforeSave: false })
    }

    await order.save()

    return res.status(200).json({
        success: true,
        order
    })
})

const deleteOrderByAdmin = promise(async (req, res, next) => {
    let order = await Order.findById(req.params.id)
    if (!order) {
        return next(new CustomError("No order found at the given id", 401))
    }


    await order.deleteOne()

    return res.status(200).json({
        success: true,
        message: "Order deleted successfully"
    })
})


module.exports = {
    createOrder,
    getOrder,
    getAllOrdersOfLoggedIn,
    getAllOrdersByAdmin,
    completeOrderByAdmin,
    deleteOrderByAdmin
}