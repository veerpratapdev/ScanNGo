import { useState } from 'react'

const ProductCard = ({ product, addToCart }) => {

  const [open, setOpen] = useState(false)

  const [liked, setLiked] = useState(false)

  return (
    <>

      <div
        onClick={() => setOpen(true)}
        className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-5 border border-blue-100 cursor-pointer'
      >

        <div className='flex justify-end mb-2'>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setLiked(!liked)
            }}
            className='text-2xl'
          >
            {liked ? '❤️' : '🤍'}
          </button>

        </div>

        <div className='bg-blue-50 rounded-xl p-4 mb-4'>

          <img
            src={product.image}
            alt={product.name}
            className='w-full h-48 object-contain'
          />

        </div>

        <h2 className='text-xl font-bold text-gray-800'>
          {product.name}
        </h2>

        <p className='text-blue-700 font-bold text-lg mt-2'>
          ₹{product.price}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation()
            addToCart(product)
          }}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl mt-5 w-full font-semibold transition'
        >
          Add To Cart
        </button>

      </div>

      {open && (

        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-5'>

          <div className='bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative'>

            <button
              onClick={() => setOpen(false)}
              className='absolute top-4 right-4 text-gray-500 text-2xl'
            >
              ×
            </button>

            <div className='bg-blue-50 rounded-xl p-5 mb-5'>

              <img
                src={product.image}
                alt={product.name}
                className='w-full h-60 object-contain'
              />

            </div>

            <h2 className='text-3xl font-bold text-blue-700 mb-3'>
              {product.name}
            </h2>

            <p className='text-gray-600 mb-4'>
              {product.description}
            </p>

            <p className='text-2xl font-bold text-blue-700 mb-6'>
              ₹{product.price}
            </p>

            <button
              onClick={() => {
                addToCart(product)
                setOpen(false)
              }}
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl w-full font-semibold'
            >
              Add To Cart
            </button>

          </div>

        </div>

      )}

    </>
  )
}

export default ProductCard