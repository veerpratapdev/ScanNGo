const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ['customer', 'shopOwner'],
        default: 'customer',
    },

    // Shop Details (Only for Shop Owners)
    shopName: {
        type: String,
        default: '',
    },

    shopAddress: {
        type: String,
        default: '',
    },

    phone: {
        type: String,
        default: '',
    },

    // Optional future enhancement
    shopLogo: {
        type: String,
        default: '',
    },

    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema)