import axios from 'axios'

const API_URL =
    'https://scanngo-iwua.onrender.com/api/admin'

// ================= GET TOKEN =================

const getToken = () => {
    return localStorage.getItem('token')
}

// ================= GET ADMIN STATS =================

export const getAdminStats = async() => {
    const token = getToken()

    const response = await axios.get(
        `${API_URL}/stats`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

    return response.data
}