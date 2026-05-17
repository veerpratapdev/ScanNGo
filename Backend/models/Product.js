const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: false,
    },

    description: {
        type: String,
        required: true,
    },

    barcode: {
        type: String,
        required: true,
    },

    // IMPORTANT 🔥
    // Product belongs to which shop owner
    shopOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Product', productSchema)