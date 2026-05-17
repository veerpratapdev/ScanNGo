const jwt = require('jsonwebtoken')
const User = require('../models/User')

// ================= PROTECT ROUTE =================

const protect = async(req, res, next) => {
    try {
        let token

        // Check token from headers
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1]
        }

        // No token
        if (!token) {
            return res.status(401).json({
                message: 'Not authorized, no token',
            })
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'scanngo_secret_key'
        )

        // Get user without password
        req.user = await User.findById(decoded.id).select('-password')

        if (!req.user) {
            return res.status(401).json({
                message: 'User not found',
            })
        }

        next()
    } catch (error) {
        res.status(401).json({
            message: 'Not authorized',
            error: error.message,
        })
    }
}

// ================= SHOP OWNER ONLY =================

const shopOwnerOnly = (req, res, next) => {
    if (req.user && req.user.role === 'shopOwner') {
        next()
    } else {
        return res.status(403).json({
            message: 'Access denied. Shop owner only.',
        })
    }
}

module.exports = {
    protect,
    shopOwnerOnly,
}