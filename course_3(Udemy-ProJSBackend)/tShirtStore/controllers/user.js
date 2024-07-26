const cloudinary = require('cloudinary')

const User = require('../models/user')
const promise = require('../middlewares/promise')
const CustomError = require('../utils/customError')
const cookieToken = require('../utils/cookieTokenResponse')
const emailHelper = require('../utils/emailHelper')

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

const login = promise(async (req, res, next) => {
    const { username, password } = req.body
    if (!username && !password) {
        return next(new CustomError("Please provide username and password", 400))
    }

    const user = await User.findOne({ username }).select("+password")

    if (!user) {
        return next(new CustomError("You're not registered", 404))
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
        return next(new CustomError("Wrong password", 400))
    }

    cookieToken(user, res)
})

const logout = promise(async (req, res, next) => {
    res.cookie(
        "token", null,
        {
            expires: new Date(Date.now()),
            httpOnly: true
        }
    ).status(200).json({
        success: true,
        message: "Logged out successfully"
    })
})

const forgotPassword = promise(async (req, res, next) => {
    try {
        const { email } = req.body
        if (!email) {
            return next(new CustomError("Please provide email", 400))
        }

        const user = await User.findOne({ email })
        if (!user) {
            return next(new CustomError("User not found at given email address", 404))
        }

        const forgotToken = await user.getResetPasswordToken()
        await user.save({ validateBeforeSave: false })

        const forgotPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${forgotToken}`
        const message = `Open the link to change your password\n\n${forgotPasswordUrl}`

        try {
            await emailHelper({
                to: email,
                subject: "Password reset email",
                text: message
            })

            return res.status(200).json({
                success: true,
                message: "Email sent successfully"
            })
        } catch (error) {
            user.forgotPassword.token = undefined
            user.forgotPassword.expiry = undefined
            await user.save({ validateBeforeSave: false })

            return next(new CustomError(error.message, error.code))
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = { signup, login, logout, forgotPassword }