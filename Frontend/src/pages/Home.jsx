import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='min-h-screen bg-blue-50 flex items-center justify-center px-8'>

      <div className='max-w-5xl text-center'>

        <h1 className='text-5xl md:text-6xl font-extrabold text-blue-700 mb-6'>
          Smart Shopping with ScanNGo
        </h1>

        <p className='text-xl text-gray-700 mb-8'>
          Scan products, add them to your cart, checkout faster, and enjoy a smooth shopping experience.
        </p>

        <div className='flex justify-center gap-5'>

          <Link
            to='/products'
            className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg shadow-md'
          >
            Start Shopping
          </Link>

          <Link
            to='/register'
            className='bg-white text-blue-700 border border-blue-600 px-8 py-3 rounded-lg text-lg shadow-md hover:bg-blue-100'
          >
            Create Account
          </Link>

        </div>

      </div>

    </div>
  )
}

export default Home