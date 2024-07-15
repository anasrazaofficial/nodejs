const cloudinary = require('cloudinary')

const User = require('../models/user')
const promise = require('../middlewares/promise')
const CustomError = require('../utils/customError')
const cookieToken = require('../utils/cookieTokenResponse')

const signup = promise(async (req, res, next) => {
    let result;
    if (req.files) {
        let file = req.files.photo
        result = await cloudinary.v2.uploader.upload(file, {
            folder: "tshirt-store",
            width: 150,
            crop: "scale"
        })
    }

    const { name, email, password } = req.body
    if (!email) {
        return next(new CustomError("Please provide email", 400))
    }

    const user = await User.create({
        name,
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