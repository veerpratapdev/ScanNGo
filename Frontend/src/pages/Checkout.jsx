import { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { createOrder } from '../api/orderApi'

function Checkout() {
  const { cart, clearCart } = useContext(CartContext)

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  // ================= TOTAL PRICE =================

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      item.price *
        (item.quantity || item.qty || 1),
    0
  )

  // ================= PLACE ORDER =================

  const handleOrder = async () => {
    // Validation
    if (!name || !phone || !address) {
      toast.error('Please fill all details')
      return
    }

    // Empty Cart
    if (cart.length === 0) {
      toast.error('Cart is empty')
      return
    }

    try {
      // Order Items
      const orderItems = cart.map((item) => ({
        name: item.name,

        price: item.price,

        quantity:
          item.quantity || item.qty || 1,

        image: item.image || '',

        barcode: item.barcode || '',
      }))

      // Logged User
      const loggedUser =
        JSON.parse(
          localStorage.getItem('userInfo')
        ) ||
        JSON.parse(localStorage.getItem('user'))

      // IMPORTANT 🔥
      // Get shop owner from product
      const shopOwner = cart[0]?.shopOwner

      if (!shopOwner) {
        toast.error('Shop owner missing')
        return
      }

      // Create Order
      await createOrder({
        user: name,

        userEmail:
          loggedUser?.email || '',

        phone,

        items: orderItems,

        totalPrice,

        address,

        // IMPORTANT
        shopOwner,
      })

      toast.success(
        'Order Placed Successfully'
      )

      clearCart()

      navigate('/success')
    } catch (error) {
      console.log(error)

      toast.error(
        error.response?.data?.message ||
          'Order Failed'
      )
    }
  }

  // ================= EMPTY CART =================

  if (cart.length === 0) {
    return (
      <div className='min-h-screen bg-blue-50 flex justify-center items-center p-8'>
        <div className='bg-white shadow-2xl rounded-2xl p-10 text-center max-w-lg w-full'>
          <h1 className='text-4xl font-bold text-blue-700 mb-5'>
            Cart Is Empty
          </h1>

          <p className='text-gray-600 mb-8'>
            Please add products before
            checkout.
          </p>

          <button
            onClick={() =>
              navigate('/products')
            }
            className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold'
          >
            Go To Products
          </button>
        </div>
      </div>
    )
  }

  // ================= MAIN UI =================

  return (
    <div className='min-h-screen bg-blue-50 p-8'>
      <h1 className='text-4xl font-bold text-blue-700 mb-10'>
        Checkout
      </h1>

      <div className='grid lg:grid-cols-3 gap-8'>
        {/* LEFT SIDE */}
        <div className='lg:col-span-2 bg-white rounded-2xl shadow-lg p-8'>
          <h2 className='text-2xl font-bold mb-6 text-gray-800'>
            Delivery Details
          </h2>

          {/* NAME */}
          <input
            type='text'
            placeholder='Customer Name'
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className='w-full border p-4 rounded-xl mb-5'
          />

          {/* PHONE */}
          <input
            type='text'
            placeholder='Phone Number'
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className='w-full border p-4 rounded-xl mb-5'
          />

          {/* ADDRESS */}
          <textarea
            placeholder='Delivery Address'
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            className='w-full border p-4 rounded-xl mb-5 h-32'
          />

          {/* BUTTON */}
          <button
            onClick={handleOrder}
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl w-full font-semibold'
          >
            Place Order
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className='bg-white rounded-2xl shadow-lg p-8 h-fit'>
          <h2 className='text-2xl font-bold text-blue-700 mb-6'>
            Order Summary
          </h2>

          {/* CART ITEMS */}
          {cart.map((item) => (
            <div
              key={item._id || item.id}
              className='flex justify-between mb-3 text-gray-700'
            >
              <span>
                {item.name} ×{' '}
                {item.quantity ||
                  item.qty ||
                  1}
              </span>

              <span>
                ₹
                {item.price *
                  (item.quantity ||
                    item.qty ||
                    1)}
              </span>
            </div>
          ))}

          <hr className='my-5' />

          {/* TOTAL */}
          <div className='flex justify-between text-xl font-bold'>
            <span>Total</span>

            <span>₹{totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout