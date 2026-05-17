import axios from 'axios'

const API_URL = 'https://scanngo-iwua.onrender.com/api/upload'

export const uploadImage = async(imageFile) => {

    const formData = new FormData()

    formData.append('image', imageFile)

    const response = await axios.post(
        `${API_URL}/image`,
        formData
    )

    return response.data
}