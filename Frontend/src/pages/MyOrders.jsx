import { useEffect, useState } from 'react'
import { getMyOrders } from '../api/orderApi'
import toast from 'react-hot-toast'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

function MyOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const getUser = () => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) return JSON.parse(userInfo)

    const user = localStorage.getItem('user')
    if (user) return JSON.parse(user)

    return null
  }

  const downloadInvoice = (order) => {
    const doc = new jsPDF()

    doc.setFontSize(22)
    doc.text('ScanNGo Invoice', 14, 20)

    doc.setFontSize(12)
    doc.text(`Order ID: ${order._id}`, 14, 32)
    doc.text(`Customer: ${order.user}`, 14, 40)
    doc.text(`Email: ${order.userEmail || 'N/A'}`, 14, 48)
    doc.text(`Phone: ${order.phone}`, 14, 56)
    doc.text(`Address: ${order.address}`, 14, 64)
    doc.text(`Status: ${order.status}`, 14, 72)
    doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`, 14, 80)

    const tableData = order.items.map((item, index) => [
      index + 1,
      item.name,
      item.quantity,
      `Rs. ${item.price}`,
      `Rs. ${item.price * item.quantity}`,
    ])

    autoTable(doc, {
      startY: 90,
      head: [['#', 'Product', 'Qty', 'Price', 'Total']],
      body: tableData,
    })

    const finalY = doc.lastAutoTable.finalY || 110

    doc.setFontSize(16)
    doc.text(`Grand Total: Rs. ${order.totalPrice}`, 14, finalY + 15)

    doc.save(`invoice-${order._id}.pdf`)
  }

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const user = getUser()

        if (!user?.email) {
          toast.error('Please login first')
          setLoading(false)
          return
        }

        const data = await getMyOrders(user.email)
        setOrders(data)
      } catch (error) {
        console.log(error)
        toast.error('My orders load failed')
      } finally {
        setLoading(false)
      }
    }

    fetchMyOrders()
  }, [])

  if (loading) {
    return (
      <div className='text-center mt-20 text-3xl font-bold text-blue-700'>
        Loading My Orders...
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-blue-50 p-8'>
      <h1 className='text-4xl font-bold text-blue-700 mb-10'>
        My Orders
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
                    Order #{order._id.slice(-6)}
                  </h2>

                  <p className='text-gray-700'>
                    Name: {order.user}
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

                  <p className='mb-3 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl font-bold'>
                    {order.status}
                  </p>

                  <button
                    onClick={() => downloadInvoice(order)}
                    className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold'
                  >
                    Download Invoice
                  </button>
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

export default MyOrders