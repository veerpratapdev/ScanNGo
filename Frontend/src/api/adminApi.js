import axios from 'axios'

const API_URL = 'https://name-scanngo-backend.onrender.com/api/admin'

export const getAdminStats = async() => {

    const response = await axios.get(
        `${API_URL}/stats`
    )

    return response.data
}