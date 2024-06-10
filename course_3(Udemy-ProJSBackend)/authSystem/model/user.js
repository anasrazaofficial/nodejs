const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    firstName: {
        type: String,
        default: null
    },
    lastName: {
        type: String, default: null
    },
    email: {
        type: String, unique: true
    },
    password: {
        type: String
    },
    token: {
        type: String
    }
})

module.exports = model('user', userSchema)