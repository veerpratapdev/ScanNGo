import { useEffect, useState } from 'react'
import {
  getOrders,
  updateOrderStatus,
} from '../api/orderApi'
import toast from 'react-hot-toast'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders()
        setOrders(data)
      } catch (error) {
        console.log(error)
        toast.error('Orders load failed')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const handleStatusChange = async (id, status) => {
    try {
      const updatedOrder = await updateOrderStatus(id, status)

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? updatedOrder : order
        )
      )

      toast.success('Order status updated')
    } catch (error) {
      console.log(error)
      toast.error('Status update failed')
    }
  }

  if (loading) {
    return (
      <div className='text-center mt-20 text-3xl font-bold text-blue-700'>
        Loading Orders...
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-blue-50 p-8'>
      <h1 className='text-4xl font-bold text-blue-700 mb-10'>
         Orders
      </h1>

      {orders.length === 0 ? (
        <div className='bg-white p-8 rounded-2xl shadow text-center text-xl'>
          No orders found
        </div>
      ) : (
        <div className='space-y-6'>
          {orders.map((order) => (
            <div
              key={order._id}
              className='bg-white shadow-lg rounded-2xl p-6'
            >
              <div className='flex justify-between flex-wrap gap-4 mb-5'>
                <div>
                  <h2 className='text-2xl font-bold text-blue-700'>
                    {order.user}
                  </h2>

                  <p className='text-gray-700'>
                    Email: {order.userEmail || 'Not available'}
                  </p>

                  <p className='text-gray-700'>
                    Phone: {order.phone}
                  </p>

                  <p className='text-gray-700'>
                    Address: {order.address}
                  </p>
                </div>

                <div className='text-right'>
                  <p className='font-bold text-green-600 text-xl'>
                    ₹{order.totalPrice}
                  </p>

                  <p className='text-sm text-gray-500 mb-2'>
                    {new Date(order.createdAt).toLocaleString()}
                  </p>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className='border px-4 py-2 rounded-xl font-bold bg-yellow-100 text-yellow-700'
                  >
                    <option value='Pending'>Pending</option>
                    <option value='Shipped'>Shipped</option>
                    <option value='Delivered'>Delivered</option>
                    <option value='Cancelled'>Cancelled</option>
                  </select>
                </div>
              </div>

              <div className='space-y-2'>
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className='flex justify-between bg-blue-50 p-3 rounded-lg'
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <span>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders