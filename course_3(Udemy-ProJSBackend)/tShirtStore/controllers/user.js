const cloudinary = require('cloudinary')

const User = require('../models/user')
const promise = require('../middlewares/promise')
const CustomError = require('../utils/customError')
const cookieToken = require('../utils/cookieTokenResponse')

const signup = promise(async (req, res, next) => {
    const { username, email, password } = req.body
    if (!email) {
        return next(new CustomError("Please provide email", 400))
    }

    if (!req.files) {
        return next(new CustomError("Please provide photo", 400))
    }

    let file = req.files.photo
    let result = await cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "tshirt-store" })

    const user = await User.create({
        username,
        email,
        password,
        photo: {
            id: result?.public_id,
            secure_url: result?.secure_url
        }
    })
    cookieToken(user, res)
})

module.exports = { signup } 