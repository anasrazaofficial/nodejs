const promise = require('../middlewares/promise')

exports.home = promise((req, res) => {
    return res.status(200).send("Hello from Anas")
})

exports.dummy = promise((req, res) => {
    return res.status(200).send("Hello from Anas. This is a dummy route")
})