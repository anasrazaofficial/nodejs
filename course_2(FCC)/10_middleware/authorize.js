function authorize(req, res, next) {
    const { user } = req.query
    if (user === 'john') {
        res.user = { id: 1, name: 'John' }
        next();
    } else {
        res.status(401).send("Unauthorized")
    }
}

module.exports = authorize