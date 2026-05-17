import axios from 'axios'

const API_URL =
    'https://scanngo-iwua.onrender.com/api/orders'

// ================= GET TOKEN =================

const getToken = () => {
    return localStorage.getItem('token')
}

// ================= CREATE ORDER =================

export const createOrder = async(
    orderData
) => {
    const token = getToken()

    const response = await axios.post(
        API_URL,
        orderData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

    return response.data
}

// ================= GET ALL ORDERS =================

export const getOrders = async() => {
    const token = getToken()

    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return response.data
}

// ================= GET MY ORDERS =================

export const getMyOrders = async(
    email
) => {
    const token = getToken()

    const response = await axios.get(
        `${API_URL}/my/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

    return response.data
}

// ================= UPDATE ORDER STATUS =================

export const updateOrderStatus = async(
    id,
    status
) => {
    const token = getToken()

    const response = await axios.put(
        `${API_URL}/${id}`, {
            status,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

    return response.data
}