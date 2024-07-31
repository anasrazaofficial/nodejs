const cloudinary = require('cloudinary')
const crypto = require('crypto')

const User = require('../models/user')
const promise = require('../middlewares/promise')
const CustomError = require('../utils/customError')
const cookieToken = require('../utils/cookieTokenResponse')
const emailHelper = require('../utils/emailHelper')

const signup = promise(async (req, res, next) => {
    const { username, email, password, role } = req.body
    if (!email) {
        return next(new CustomError("Please provide email", 400))
    }

    if (!req.files) {
        return next(new CustomError("Please provide photo", 400))
    }

    let file = req.files.photo
    let result = await cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "tshirt-store/users" })

    const user = await User.create({
        username,
        email,
        password,
        role,
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

        const forgotPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${forgotToken}`
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

const resetPassword = promise(async (req, res, next) => {
    const token = req.params.token;
    const encryptedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        'forgotPassword.token': encryptedToken,
        'forgotPassword.expiry': { $gt: Date.now() },
    });

    if (!user) {
        return next(new CustomError("Token is invalid or expired", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new CustomError("Password and confirm password do not match", 400));
    }

    user.password = req.body.password;
    user.forgotPassword = undefined;

    await user.save();

    cookieToken(user, res);
});

const getLoggedInUser = promise(async (req, res, next) => {
    const user = req.user

    return res.status(200).json({
        success: true,
        user
    })
});

const changePassword = promise(async (req, res, next) => {
    const userId = req.user.id
    const user = await User.findById(userId).select("+password")
    const arePasswordsSame = user.comparePassword(req.body.currentPassword)

    if (!arePasswordsSame) {
        return next(new CustomError("Incorrect password", 400))
    }

    user.password = req.body.newPassword

    await user.save()

    cookieToken(user, res)
});

const updateUser = promise(async (req, res, next) => {
    const newDate = {
        username: req.body.username,
        email: req.body.email
    }

    if (req.files) {
        const imageId = req.user.photo.id
        await cloudinary.v2.uploader.destroy(imageId)
        const result = await cloudinary.v2.uploader.upload(req.files.photo.tempFilePath, { folder: "tshirt-store/users" })

        newData.photo = {
            id: result.public_id,
            secure_url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newDate, {
        new: true,
        runValidators: true
    });

    return res.status(200).json({
        success: true,
        user
    })
});

const getAllUsersByAdmin = promise(async (req, res, next) => {
    const users = await User.find()

    return res.status(200).json({
        success: true,
        users
    })
});

const getOneUserByAdmin = promise(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new CustomError('User not found'), 400)
    }

    return res.status(200).json({
        success: true,
        user
    })
});

const updateUserRoleByAdmin = promise(async (req, res, next) => {
    const role = req.body.role

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true, runValidators: true }
    )

    return res.status(200).json({
        success: true,
        user
    })
});

const deleteUserByAdmin = promise(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new CustomError("User not found", 401))
    }

    await cloudinary.v2.uploader.destroy(user.photo.id)

    await user.deleteOne()

    return res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
});

const getAllUsersByManager = promise(async (req, res, next) => {
    const users = await User.find({ role: 'user' })

    return res.status(200).json({
        success: true,
        users
    })
});


module.exports = {
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword,
    getLoggedInUser,
    changePassword,
    updateUser,
    getAllUsersByAdmin,
    getOneUserByAdmin,
    updateUserRoleByAdmin,
    deleteUserByAdmin,
    getAllUsersByManager
}