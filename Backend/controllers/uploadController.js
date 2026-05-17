const cloudinary = require('../config/cloudinary')

const uploadImage = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: 'No image received'
            })
        }

        console.log('Uploading file:', req.file.path)

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'scanngo-products'
        })

        console.log('Upload success:', result.secure_url)

        res.status(200).json({
            imageUrl: result.secure_url
        })

    } catch (error) {
        console.log('Upload error:', error.message)

        res.status(500).json({
            message: 'Upload Failed',
            error: error.message
        })
    }
}

module.exports = {
    uploadImage
}