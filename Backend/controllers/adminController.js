const Product = require('../models/Product')
const Order = require('../models/Order')

const getDashboardStats = async(req, res) => {
    try {
        // Only this shop owner's products
        const totalProducts = await Product.countDocuments({
            shopOwner: req.user._id,
        })

        // Only this shop owner's orders
        const totalOrders = await Order.countDocuments({
            shopOwner: req.user._id,
        })

        // Fetch owner's orders
        const orders = await Order.find({
            shopOwner: req.user._id,
        })

        // Calculate revenue
        const totalRevenue = orders.reduce(
            (total, order) => total + order.totalPrice,
            0
        )

        // Recent Orders
        const recentOrders = await Order.find({
                shopOwner: req.user._id,
            })
            .sort({ createdAt: -1 })
            .limit(5)

        res.status(200).json({
            totalProducts,
            totalOrders,
            totalRevenue,
            recentOrders,
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