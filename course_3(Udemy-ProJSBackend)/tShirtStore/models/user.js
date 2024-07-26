const { Schema, model } = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const { JWT_SECRET_KEY, JWT_EXPIRY } = process.env

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        validate: [validator.isEmail, "Please provide email in correct format"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false
    },
    role: {
        type: String,
        default: 'user',
    },
    photo: {
        id: {
            type: String,
            required: [true, "Please provide photo id"]

        },
        secure_url: {
            type: String,
            required: [true, "Please provide photo secure url"]

        }
    },
    forgotPassword: {
        token: String,
        expiry: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

// Pre hooks execute before the document is hit with any event
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10)
})

// Compare Passwords
userSchema.methods.comparePassword = async function (passwordInput) {
    return await bcrypt.compare(passwordInput, this.password)
}

// JWT token
userSchema.methods.getJWTToken = async function () {
    return jwt.sign(
        { id: this._id },
        JWT_SECRET_KEY,
        { expiresIn: JWT_EXPIRY }
    )
}

// Reset Password Token
userSchema.methods.getResetPasswordToken = async function () {
    const tokenString = crypto.randomBytes(20).toString("hex")

    this.forgotPassword.token = crypto.createHash("sha256").update(tokenString).digest("hex")
    this.forgotPassword.expiry = Date.now() + 20 * 60 * 1000

    return tokenString
}

module.exports = model('User', userSchema)