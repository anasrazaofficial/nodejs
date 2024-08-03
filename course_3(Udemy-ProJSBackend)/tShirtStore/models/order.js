const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        }
    },
    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        product: {
            type: Schema.ObjectId,
            ref: "Product",
            required: true
        }
    }],
    paymentInfo: String,
    taxAmount: {
        type: Number,
        required: true
    },
    shippingAmount: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'pending',
        enum: {
            values: ['pending', 'delivered', 'canceled'],
            message: 'Please select category only from - pending, delivered, canceled'
        }
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = new model("Order", orderSchema)