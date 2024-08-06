const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: String,
    googleId: String,
    email: String
})

module.exports = model('User', userSchema);