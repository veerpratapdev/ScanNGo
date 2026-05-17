import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

function FloatingCart() {
  const { cart } = useContext(CartContext)

  return (
    <Link
      to='/cart'
      className='fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-2xl z-50'
    >
      🛒

      <span className='absolute -top-2 -right-2 bg-white text-blue-700 text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center'>
        {cart.length}
      </span>
    </Link>
  )
}

export default FloatingCart