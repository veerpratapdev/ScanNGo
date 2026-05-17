import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useContext(CartContext)

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <div className='min-h-screen bg-blue-50 p-8'>

      <h1 className='text-4xl font-bold text-blue-700 mb-10'>
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className='bg-white rounded-2xl shadow-lg p-10 text-center'>
          <h2 className='text-2xl text-gray-700 mb-5'>
            Your cart is empty
          </h2>

          <Link
            to='/products'
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl'
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className='grid lg:grid-cols-3 gap-8'>

          <div className='lg:col-span-2 space-y-5'>

            {cart.map((item) => (
              <div
                key={item.id}
                className='bg-white rounded-2xl shadow-lg p-5 flex items-center justify-between'
              >
                <div className='flex items-center gap-5'>
                  <div className='bg-blue-50 p-3 rounded-xl'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-24 h-24 object-contain'
                    />
                  </div>

                  <div>
                    <h2 className='text-2xl font-bold text-gray-800'>
                      {item.name}
                    </h2>

                    <p className='text-blue-700 font-semibold text-lg mt-2'>
                      ₹{item.price}
                    </p>

                    <div className='flex items-center gap-3 mt-4'>
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className='bg-blue-600 text-white w-8 h-8 rounded-full'
                      >
                        -
                      </button>

                      <span className='font-bold text-lg'>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className='bg-blue-600 text-white w-8 h-8 rounded-full'
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className='bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg'
                >
                  Remove
                </button>
              </div>
            ))}

          </div>

          <div className='bg-white rounded-2xl shadow-lg p-8 h-fit'>
            <h2 className='text-3xl font-bold text-blue-700 mb-6'>
              Summary
            </h2>

            <div className='flex justify-between text-xl mb-5'>
              <span>Total</span>
              <span className='font-bold'>₹{totalPrice}</span>
            </div>

            <Link
              to='/checkout'
              className='block text-center bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold'
            >
              Proceed To Checkout
            </Link>
          </div>

        </div>
      )}

    </div>
  )
}

export default Cart