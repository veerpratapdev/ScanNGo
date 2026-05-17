import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const getToken = () => {
    const directToken = localStorage.getItem('token')
    if (directToken) return directToken

    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) return JSON.parse(userInfo)?.token

    return null
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://name-scanngo-backend.onrender.com/api/products')
      const result = await res.json()

      if (res.ok) {
        setProducts(result)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id) => {
    try {
      const confirmDelete = window.confirm('Delete this product?')

      if (!confirmDelete) return

      const token = getToken()

      const res = await fetch(`https://name-scanngo-backend.onrender.com/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await res.json()

      if (res.ok) {
        toast.success('Product Deleted')

        setProducts((prev) =>
          prev.filter((item) => item._id !== id)
        )
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Delete failed')
    }
  }

  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts()
    }

    loadProducts()
  }, [])

  if (loading) {
    return (
        
      <div className='text-center mt-20 text-3xl font-bold text-blue-700'>
        Loading Products...
      </div>
    )
  }

  return (
    
    <div className='min-h-screen bg-blue-50 p-8'>
      <h1 className='text-4xl font-bold text-blue-700 mb-8 text-center'>
      Product List - {products.length}
      </h1>

      <div className='grid md:grid-cols-3 gap-6'>
        {products.map((product) => (
          <div
            key={product._id}
            className='bg-white rounded-2xl shadow-xl overflow-hidden'
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className='w-full h-60 object-cover'
              />
            )}

            <div className='p-5'>
              <h2 className='text-2xl font-bold text-blue-700 mb-2'>
                {product.name}
              </h2>

              <p className='text-gray-600 mb-2'>
                {product.description}
              </p>

              <p className='font-bold'>Price: ₹{product.price}</p>

              <p className='font-bold'>
                Category: {product.category}
              </p>

              <p className='text-sm text-gray-500 mt-2 break-all'>
                Barcode: {product.barcode}
              </p>

              <button
                onClick={() =>
                  (window.location.href = `/products/edit/${product._id}`)
                }
                className='w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-bold'
              >
                Edit Product
              </button>

              <button
                onClick={() => deleteProduct(product._id)}
                className='w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-bold'
              >
                Delete Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList