require('dotenv').config()
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoutes')
const orderRoutes = require('./routes/orderRoutes')
const adminRoutes = require('./routes/adminRoutes')
const productRoutes = require('./routes/productRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

dotenv.config()
connectDB()

const app = express()

app.use(cors({
    origin: '*',
    credentials: true
}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('ScanNGo Backend Running')
})

app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/products', productRoutes)
app.use('/api/upload', uploadRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})