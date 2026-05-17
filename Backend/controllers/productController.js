const Product = require('../models/Product')

const createProduct = async(req, res) => {
    try {
        console.log("BODY DATA:", req.body);

        const { name, price, category, description, barcode, image } = req.body;

        if (!name || !price || !category || !description || !barcode) {
            return res.status(400).json({
                message: "All required fields are needed",
            });
        }

        const existingProduct = await Product.findOne({ barcode });

        if (existingProduct) {
            return res.status(400).json({
                message: "Product with this barcode already exists",
            });
        }

        const product = await Product.create({
            name,
            price,
            category,
            description,
            barcode,
            image,
        });

        res.status(201).json({
            message: "Product Added",
            product,
        });
    } catch (error) {
        console.log("PRODUCT ADD ERROR:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};

const getProducts = async(req, res) => {

    try {

        const products = await Product.find()

        res.status(200).json(products)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}

const getProductByBarcode = async(req, res) => {

    try {

        const product = await Product.findOne({
            barcode: req.params.barcode
        })

        if (!product) {

            return res.status(404).json({
                message: 'Product not found'
            })
        }

        res.status(200).json(product)

    } catch (error) {

        res.status(500).json({
            message: 'Server Error'
        })
    }
}

const getProductById = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)

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

const deleteProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)

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

const updateProduct = async(req, res) => {

    try {

        const product = await Product.findById(req.params.id)

        if (!product) {

            return res.status(404).json({
                message: 'Product not found'
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
            message: 'Update Failed'
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