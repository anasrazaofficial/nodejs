const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide product name'],
        trim: true  // Just like javascript trim()
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price']
    },
    description: {
        type: String,
        required: [true, 'Please provide product description']
    },
    photos: [{
        id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, 'Please select category from - short-sleeves, long-sleeves, sweat-shirts, hoodies'],
        enum: {
            values: ['shortSleeves', 'longSleeves', 'sweatShirts', 'hoodies'],
            message: 'Please select category only from - short-sleeves, long-sleeves, sweat-shirts, hoodies'    // If nothing or something else is provided, then it'll be shown
        }
    },
    brand: {
        type: String,
        required: [true, 'Please provide product brand']
    },
    // stock: {
    //     type: String,
    //     required: [true, 'Please provide product price']
    // },
    ratings: {
        type: Number,
        default: 0
    },
    noOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        user: {
            type: Schema.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }],
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model('Product', productSchema)