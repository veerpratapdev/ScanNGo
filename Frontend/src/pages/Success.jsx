import { Link } from 'react-router-dom'

function Success() {
  return (
    <div className='min-h-screen bg-blue-50 flex justify-center items-center px-6'>

      <div className='bg-white shadow-2xl rounded-2xl p-10 text-center max-w-lg'>

        <div className='text-6xl mb-5'>
          ✅
        </div>

        <h1 className='text-4xl font-bold text-blue-700 mb-4'>
          Order Placed!
        </h1>

        <p className='text-gray-600 mb-8'>
          Your order has been placed successfully. Thank you for shopping with ScanNGo.
        </p>

        <Link
          to='/products'
          className='inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold'
        >
          Continue Shopping
        </Link>

      </div>

    </div>
  )
}

export default Success