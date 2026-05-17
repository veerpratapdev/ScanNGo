const Product = require('../models/Product')
const Order = require('../models/Order')

const getDashboardStats = async(req, res) => {
    try {
        const totalProducts = await Product.countDocuments()

        const totalOrders = await Order.countDocuments()

        const orders = await Order.find()

        const totalRevenue = orders.reduce(
            (total, order) => total + order.totalPrice,
            0
        )

        res.status(200).json({
            totalProducts,
            totalOrders,
            totalRevenue,
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: 'Dashboard load failed',
        })
    }
}

module.exports = {
    getDashboardStats,
}