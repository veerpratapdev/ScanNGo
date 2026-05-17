const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },

    userEmail: {
        type: String,
        required: false,
    },

    phone: {
        type: String,
        required: true,
    },

    items: [{
        name: String,
        price: Number,
        quantity: Number,
        image: String,
        barcode: String,
    }, ],

    totalPrice: {
        type: Number,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    // IMPORTANT 🔥
    // Which shop owner received this order
    shopOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    status: {
        type: String,
        enum: [
            'Pending',
            'Confirmed',
            'Preparing',
            'Out for Delivery',
            'Delivered',
            'Cancelled',
        ],
        default: 'Pending',
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Order', orderSchema)