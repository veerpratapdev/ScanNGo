const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({ id },
        process.env.JWT_SECRET || 'scanngo_secret_key', { expiresIn: '7d' }
    )
}

// ================= REGISTER USER =================

const registerUser = async(req, res) => {
    try {
        const {
            name,
            email,
            password,
            role,
            shopName,
            shopAddress,
            phone,
        } = req.body

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Please fill all required fields',
            })
        }

        // Shop Owner Validation
        if (role === 'shopOwner') {
            if (!shopName || !shopAddress || !phone) {
                return res.status(400).json({
                    message: 'Shop name, shop address and phone are required for shop owner',
                })
            }
        }

        // Check Existing User
        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({
                message: 'User already exists',
            })
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,

            role: role || 'customer',

            // Shop Details
            shopName: role === 'shopOwner' ? shopName : '',
            shopAddress: role === 'shopOwner' ? shopAddress : '',
            phone: role === 'shopOwner' ? phone : '',
        })

        // Response
        res.status(201).json({
            message: 'User registered successfully',

            token: generateToken(user._id),

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,

                shopName: user.shopName,
                shopAddress: user.shopAddress,
                phone: user.phone,
            },
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        })
    }
}

// ================= LOGIN USER =================

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                message: 'Please enter email and password',
            })
        }

        // Find User
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password',
            })
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid email or password',
            })
        }

        // Response
        res.status(200).json({
            message: 'Login successful',

            token: generateToken(user._id),

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,

                shopName: user.shopName,
                shopAddress: user.shopAddress,
                phone: user.phone,
            },
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
}