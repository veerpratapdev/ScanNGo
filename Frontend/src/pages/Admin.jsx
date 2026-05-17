import { useEffect, useState } from 'react'
import { getAdminStats } from '../api/adminApi'
import { getOrders, updateOrderStatus } from '../api/orderApi'
import toast from 'react-hot-toast'

function Admin() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  })

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try {
      const statsData = await getAdminStats()
      setStats(statsData)

      const ordersData = await getOrders()
      setOrders(ordersData)
    } catch (error) {
      console.log(error)
      toast.error('Admin data load failed')
    } finally {
      setLoading(false)
    }
  }

 useEffect(() => {

  const fetchData = async () => {
    await loadData()
  }

  fetchData()

}, [])

  const handleStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status)
      toast.success('Order status updated')
      loadData()
    } catch (error) {
      console.log(error)
      toast.error('Status update failed')
    }
  }

  if (loading) {
    return (
      <div className='text-center mt-20 text-3xl font-bold text-blue-700'>
        Loading Dashboard...
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-blue-50 p-8'>
      <h1 className='text-4xl font-bold text-blue-700 mb-10'>
        Admin Dashboard
      </h1>

      <div className='grid md:grid-cols-3 gap-6 mb-10'>
        <div className='bg-white shadow-lg rounded-2xl p-8 text-center'>
          <h2 className='text-2xl font-bold text-blue-700 mb-3'>
            Total Products
          </h2>
          <p className='text-4xl font-bold text-gray-700'>
            {stats.totalProducts}
          </p>
        </div>

        <div className='bg-white shadow-lg rounded-2xl p-8 text-center'>
          <h2 className='text-2xl font-bold text-blue-700 mb-3'>
            Total Orders
          </h2>
          <p className='text-4xl font-bold text-gray-700'>
            {stats.totalOrders}
          </p>
        </div>

        <div className='bg-white shadow-lg rounded-2xl p-8 text-center'>
          <h2 className='text-2xl font-bold text-blue-700 mb-3'>
            Total Revenue
          </h2>
          <p className='text-4xl font-bold text-green-600'>
            ₹{stats.totalRevenue}
          </p>
        </div>
      </div>

      <div className='grid md:grid-cols-3 gap-4 mb-10'>
        <a
          href='/add-product'
          className='bg-blue-600 text-white text-center py-4 rounded-xl font-bold'
        >
          Add Product
        </a>

        <a
          href='/admin/products'
          className='bg-green-600 text-white text-center py-4 rounded-xl font-bold'
        >
          Manage Products
        </a>

        <a
          href='/admin/orders'
          className='bg-purple-600 text-white text-center py-4 rounded-xl font-bold'
        >
          View Orders
        </a>

      </div>

      <h2 className='text-3xl font-bold text-blue-700 mb-6'>
        Recent Orders
      </h2>


      <div className='space-y-6'>
        {orders.map((order) => (
          <div
            key={order._id}
            className='bg-white shadow-lg rounded-2xl p-6'
          >
            <div className='flex justify-between items-start gap-4 mb-4'>
              <div>
                <h3 className='text-2xl font-bold text-blue-700'>
                  {order.user}
                </h3>

                <p className='text-gray-600'>
                  Phone: {order.phone}
                </p>

                <p className='text-gray-600'>
                  Address: {order.address}
                </p>
              </div>

              <div className='text-right'>
                <p className='font-bold text-xl text-green-600'>
                  ₹{order.totalPrice}
                </p>

                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatus(order._id, e.target.value)
                  }
                  className='mt-2 border px-4 py-2 rounded-xl font-bold'
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
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Admin