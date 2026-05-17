const express = require('express')

const {
    getDashboardStats,
} = require('../controllers/adminController')

// IMPORT MIDDLEWARE 🔥
const {
    protect,
    shopOwnerOnly,
} = require('../middleware/authMiddleware')

const router = express.Router()

// ================= ADMIN DASHBOARD =================

router.get(
    '/stats',
    protect,
    shopOwnerOnly,
    getDashboardStats
)

module.exports = router