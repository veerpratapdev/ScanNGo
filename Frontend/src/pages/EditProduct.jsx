import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    barcode: '',
    image: '',
  })

  const getToken = () => {
    const directToken = localStorage.getItem('token')
    if (directToken) return directToken

    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) return JSON.parse(userInfo)?.token

    return null
  }

  const fetchProduct = async () => {
    try {
      const res = await fetch(`https://name-scanngo-backend.onrender.com/api/products/${id}`)
      const result = await res.json()

      if (res.ok) {
        setFormData({
          name: result.name || '',
          price: result.price || '',
          category: result.category || '',
          description: result.description || '',
          barcode: result.barcode || '',
          image: result.image || '',
        })
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Product load failed')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setUpdating(true)

      const token = getToken()

      const res = await fetch(`https://name-scanngo-backend.onrender.com/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      })

      const result = await res.json()

      if (res.ok) {
        toast.success('Product Updated')
        navigate('/products')
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Update failed')
    } finally {
      setUpdating(false)
    }
  }

  useEffect(() => {

  const loadProduct = async () => {
    await fetchProduct()
  }

  loadProduct()

}, [])

  if (loading) {
    return (
      <div className='text-center mt-20 text-3xl font-bold text-blue-700'>
        Loading Product...
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-blue-50 p-8'>
      <h1 className='text-4xl font-bold text-blue-700 mb-8 text-center'>
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-2xl rounded-2xl p-6 max-w-2xl mx-auto'
      >
        {formData.image && (
          <img
            src={formData.image}
            alt={formData.name}
            className='w-full h-64 object-cover rounded-xl mb-5'
          />
        )}

        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Product Name'
          className='w-full border p-3 rounded-xl mb-4'
          required
        />

        <input
          type='number'
          name='price'
          value={formData.price}
          onChange={handleChange}
          placeholder='Price'
          className='w-full border p-3 rounded-xl mb-4'
          required
        />

        <input
          type='text'
          name='category'
          value={formData.category}
          onChange={handleChange}
          placeholder='Category'
          className='w-full border p-3 rounded-xl mb-4'
          required
        />

        <textarea
          name='description'
          value={formData.description}
          onChange={handleChange}
          placeholder='Description'
          className='w-full border p-3 rounded-xl mb-4'
          required
        />

        <input
          type='text'
          name='barcode'
          value={formData.barcode}
          onChange={handleChange}
          placeholder='Barcode'
          className='w-full border p-3 rounded-xl mb-4'
          required
        />

        <input
          type='text'
          name='image'
          value={formData.image}
          onChange={handleChange}
          placeholder='Image URL'
          className='w-full border p-3 rounded-xl mb-4'
        />

        <button
          type='submit'
          disabled={updating}
          className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold disabled:bg-gray-400'
        >
          {updating ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  )
}

export default EditProduct