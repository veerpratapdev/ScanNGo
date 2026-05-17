import axios from 'axios'

const API_URL =
    'https://scanngo-iwua.onrender.com/api/products'

// ================= GET TOKEN =================

const getToken = () => {
    return localStorage.getItem('token')
}

// ================= CREATE PRODUCT =================

export const createProduct = async(
    productData
) => {
    const token = getToken()

    const response = await axios.post(
        API_URL,
        productData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

    return response.data
}

// ================= GET PRODUCTS =================

export const getProducts = async() => {
    const token = getToken()

    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return response.data
}

// ================= GET PRODUCT BY BARCODE =================

export const getProductByBarcode = async(
    barcode
) => {
    const token = getToken()

    const response = await axios.get(
        `${API_URL}/barcode/${barcode}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

    return response.data
}

// ================= DELETE PRODUCT =================

export const deleteProduct = async(id) => {
    const token = getToken()

    const response = await axios.delete(
        `${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

    return response.data
}

// ================= UPDATE PRODUCT =================

export const updateProduct = async(
    id,
    productData
) => {
    const token = getToken()

    const response = await axios.put(
        `${API_URL}/${id}`,
        productData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

    return response.data
}

// ================= GET PRODUCT BY ID =================

export const getProductById = async(id) => {
    const token = getToken()

    const response = await axios.get(
        `${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

    return response.data
}