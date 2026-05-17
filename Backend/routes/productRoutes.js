const express = require('express')

const {
    createProduct,
    getProducts,
    getProductByBarcode,
    getProductById,
    deleteProduct,
    updateProduct,
} = require('../controllers/productController')

// IMPORT MIDDLEWARE 🔥
const {
    protect,
    shopOwnerOnly,
} = require('../middleware/authMiddleware')

const router = express.Router()

// TEST ROUTE
router.get('/test', (req, res) => {
    res.json({ message: 'Product route working' })
})

// ================= PUBLIC / PROTECTED =================

// Get all products (logged in users)
router.get('/', protect, getProducts)

// Get product by barcode
router.get(
    '/barcode/:barcode',
    protect,
    getProductByBarcode
)

// Get product by ID
router.get('/:id', protect, getProductById)

// ================= SHOP OWNER ONLY =================

// Create product
router.post(
    '/',
    protect,
    shopOwnerOnly,
    createProduct
)

// Update product
router.put(
    '/:id',
    protect,
    shopOwnerOnly,
    updateProduct
)

// Delete product
router.delete(
    '/:id',
    protect,
    shopOwnerOnly,
    deleteProduct
)

module.exports = router