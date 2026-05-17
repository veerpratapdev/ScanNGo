const Order = require('../models/Order')

// ================= CREATE ORDER =================

const createOrder = async(req, res) => {
    try {
        const {
            user,
            userEmail,
            phone,
            items,
            totalPrice,
            address,
            shopOwner,
        } = req.body

        // Validation
        if (!user ||
            !phone ||
            !items ||
            !totalPrice ||
            !address ||
            !shopOwner
        ) {
            return res.status(400).json({
                message: 'All order details are required',
            })
        }

        // Create Order
        const order = await Order.create({
            user,
            userEmail,
            phone,
            items,
            totalPrice,
            address,

            // IMPORTANT 🔥
            shopOwner,
        })

        res.status(201).json({
            message: 'Order Placed',
            order,
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: 'Order Failed',
        })
    }
}

// ================= GET ALL ORDERS (SHOP OWNER ONLY) =================

const getOrders = async(req, res) => {
    try {
        // Only this owner's shop orders
        const orders = await Order.find({
            shopOwner: req.user._id,
        }).sort({
            createdAt: -1,
        })

        res.status(200).json(orders)
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: 'Failed to fetch orders',
        })
    }
}

// ================= GET MY ORDERS (CUSTOMER) =================

const getMyOrders = async(req, res) => {
    try {
        const orders = await Order.find({
            userEmail: req.params.email,
        }).sort({
            createdAt: -1,
        })

        res.status(200).json(orders)
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: 'Failed to fetch my orders',
        })
    }
}

// ================= UPDATE ORDER STATUS =================

const updateOrderStatus = async(req, res) => {
    try {
        // Only owner's order
        const order = await Order.findOne({
            _id: req.params.id,
            shopOwner: req.user._id,
        })

        if (!order) {
            return res.status(404).json({
                message: 'Order not found',
            })
        }

        order.status = req.body.status || order.status

        const updatedOrder = await order.save()

        res.status(200).json(updatedOrder)
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: 'Status update failed',
        })
    }
}

module.exports = {
    createOrder,
    getOrders,
    getMyOrders,
    updateOrderStatus,
}