const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const promise = require('../middlewares/promise')

const handleStripePayment = promise(async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd"
    })

    return res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})

module.exports = handleStripePayment