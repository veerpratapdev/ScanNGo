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
    }, ],

    totalPrice: {
        type: Number,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        default: 'Pending',
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Order', orderSchema)