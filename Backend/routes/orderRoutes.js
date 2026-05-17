const express = require('express')

const {
    createOrder,
    getOrders,
    getMyOrders,
    updateOrderStatus,
} = require('../controllers/orderController')

const router = express.Router()

router.post('/', createOrder)

router.get('/', getOrders)

router.get('/my/:email', getMyOrders)

router.put('/:id', updateOrderStatus)

module.exports = router