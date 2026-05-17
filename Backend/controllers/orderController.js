const Order = require('../models/Order')

const createOrder = async(req, res) => {
    try {
        const {
            user,
            userEmail,
            phone,
            items,
            totalPrice,
            address,
        } = req.body

        if (!user || !phone || !items || !totalPrice || !address) {
            return res.status(400).json({
                message: 'All order details are required',
            })
        }

        const order = await Order.create({
            user,
            userEmail,
            phone,
            items,
            totalPrice,
            address,
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

const getOrders = async(req, res) => {
    try {
        const orders = await Order.find().sort({
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

const updateOrderStatus = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id)

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