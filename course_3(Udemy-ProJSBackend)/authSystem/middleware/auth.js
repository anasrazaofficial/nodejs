const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env

const auth = (req, res, next) => {
    // console.log(req.cookies);
    const token = req.header('Authorization')?.replace("Bearer ", "")
        || req.cookies.token
        || req.body.token;

    if (!token) {
        res.status(403).send("Token not found")
    }

    try {
        const decode = jwt.verify(token, SECRET_KEY)
        // console.log(decode);

        req.user = decode // After authentication we can get the user by using the datebase

    } catch (error) {
        res.status(401).send("Invalid token")
    }

    next();
}

module.exports = auth