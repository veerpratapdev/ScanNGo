const Product = require('../models/Product')

// ================= CREATE PRODUCT =================

const createProduct = async(req, res) => {
    try {
        console.log('BODY DATA:', req.body)

        const {
            name,
            price,
            category,
            description,
            barcode,
            image,
        } = req.body

        // Validation
        if (!name || !price || !category || !description || !barcode) {
            return res.status(400).json({
                message: 'All required fields are needed',
            })
        }

        // Barcode unique per shop owner
        const existingProduct = await Product.findOne({
            barcode,
            shopOwner: req.user._id,
        })

        if (existingProduct) {
            return res.status(400).json({
                message: 'Product with this barcode already exists',
            })
        }

        // Create Product
        const product = await Product.create({
            name,
            price,
            category,
            description,
            barcode,
            image,

            // IMPORTANT
            shopOwner: req.user._id,
        })

        res.status(201).json({
            message: 'Product Added',
            product,
        })
    } catch (error) {
        console.log('PRODUCT ADD ERROR:', error)

        res.status(500).json({
            message: error.message,
        })
    }
}

// ================= GET PRODUCTS =================

const getProducts = async(req, res) => {
    try {
        // Only owner's products
        const products = await Product.find({
            shopOwner: req.user._id,
        })

        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

// ================= GET PRODUCT BY BARCODE =================

const getProductByBarcode = async(req, res) => {
    try {
        const product = await Product.findOne({
            barcode: req.params.barcode,
            shopOwner: req.user._id,
        })

        if (!product) {
            return res.status(404).json({
                message: 'Product not found',
            })
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
        })
    }
}

// ================= GET PRODUCT BY ID =================

const getProductById = async(req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id,
            shopOwner: req.user._id,
        })

        if (!product) {
            return res.status(404).json({
                message: 'Product not found',
            })
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
        })
    }
}

// ================= DELETE PRODUCT =================

const deleteProduct = async(req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id,
            shopOwner: req.user._id,
        })

        if (!product) {
            return res.status(404).json({
                message: 'Product not found',
            })
        }

        await product.deleteOne()

        res.status(200).json({
            message: 'Product Deleted',
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: 'Delete Failed',
        })
    }
}

// ================= UPDATE PRODUCT =================

const updateProduct = async(req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id,
            shopOwner: req.user._id,
        })

        if (!product) {
            return res.status(404).json({
                message: 'Product not found',
            })
        }

        product.name = req.body.name || product.name
        product.price = req.body.price || product.price
        product.category = req.body.category || product.category
        product.description = req.body.description || product.description
        product.barcode = req.body.barcode || product.barcode
        product.image = req.body.image || product.image

        const updatedProduct = await product.save()

        res.status(200).json(updatedProduct)
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: 'Update Failed',
        })
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductByBarcode,
    getProductById,
    updateProduct,
    deleteProduct,
}