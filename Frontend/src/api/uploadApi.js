import axios from 'axios'

const API_URL = 'http://localhost:5000/api/upload'

export const uploadImage = async(imageFile) => {

    const formData = new FormData()

    formData.append('image', imageFile)

    const response = await axios.post(
        `${API_URL}/image`,
        formData
    )

    return response.data
}