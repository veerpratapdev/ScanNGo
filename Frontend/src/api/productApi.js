import axios from 'axios'

const API_URL = 'https://name-scanngo-backend.onrender.com/api/products'

export const createProduct = async(productData) => {

    const response = await axios.post(
        `${API_URL}/create`,
        productData
    )

    return response.data
}

export const getProducts = async() => {

    const response = await axios.get(API_URL)

    return response.data
}