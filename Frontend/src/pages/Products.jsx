import { useContext, useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { CartContext } from '../context/CartContext'
import { getProducts } from '../api/productApi'

const Products = () => {
  const { addToCart } = useContext(CartContext)

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('Default')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const categories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ]

  let filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      product.barcode?.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      category === 'All' || product.category === category

    return matchesSearch && matchesCategory
  })

  if (sort === 'LowToHigh') {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    )
  }

  if (sort === 'HighToLow') {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    )
  }

  const resetFilters = () => {
    setSearch('')
    setCategory('All')
    setSort('Default')
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-blue-50 flex justify-center items-center'>
        <h1 className='text-3xl font-bold text-blue-700'>
          Loading Products...
        </h1>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-blue-50 p-10'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
        <div>
          <h1 className='text-4xl font-bold text-blue-700'>
            Products
          </h1>

          <p className='text-gray-600 mt-2'>
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <button
          onClick={resetFilters}
          className='bg-white border px-5 py-3 rounded-xl font-bold shadow-sm hover:bg-blue-100'
        >
          Reset Filters
        </button>
      </div>

      <div className='bg-white shadow-lg rounded-2xl p-5 mb-8 grid md:grid-cols-3 gap-5'>
        <input
          type='text'
          placeholder='Search by name, category or barcode...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full p-4 rounded-xl border shadow-sm'
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='p-4 rounded-xl border shadow-sm'
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className='p-4 rounded-xl border shadow-sm'
        >
          <option value='Default'>Default Sort</option>
          <option value='LowToHigh'>Price: Low to High</option>
          <option value='HighToLow'>Price: High to Low</option>
        </select>
      </div>

      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={{
                ...product,
                id: product._id,
              }}
              addToCart={addToCart}
            />
          ))}
        </div>
      ) : (
        <div className='bg-white shadow-lg rounded-2xl p-10 text-center mt-10'>
          <h2 className='text-3xl font-bold text-blue-700 mb-4'>
            No Product Found
          </h2>

          <p className='text-gray-600 mb-5'>
            Try searching for another product.
          </p>

          <button
            onClick={resetFilters}
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold'
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default Products