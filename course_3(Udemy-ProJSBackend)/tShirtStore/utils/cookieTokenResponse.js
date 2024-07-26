const cookieTokenResponse = async (user, res) => {
    const token = await user.getJWTToken()

    user.password = undefined
    return res.status(200).cookie('token', token, {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true
    }).json({
        success: true,
        token,
        user
    })
}

module.exports = cookieTokenResponse