const jwt = require('jsonwebtoken')

const { JWT_SECRET_KEY } = process.env

const promise = require('./promise')
const CustomError = require('../utils/customError')
const User = require('../models/user')

exports.isLoggedIn = promise(async (req, res, next) => {
    const token = req?.cookies?.token || req?.headers("Authentication")?.replace("Bearer ", "")

    if (!token) {
        return next(new CustomError("Login first to access this page", 401))
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)

    next()
})