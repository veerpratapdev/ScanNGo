import { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/browser'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

function Scanner() {
  const videoRef = useRef(null)
  const lastScannedRef = useRef('')

  const [data, setData] = useState('Not Found')
  const [product, setProduct] = useState(null)
  const [cart, setCart] = useState([])
  const [manualBarcode, setManualBarcode] = useState('')

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item._id === product._id
      )

      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }

      return [...prevCart, { ...product, qty: 1 }]
    })
  }

  const fetchProduct = async (barcode) => {
    try {
      const res = await fetch(
        `https://name-scanngo-backend.onrender.com/api/products/barcode/${barcode}`
      )

      const result = await res.json()

      if (res.ok) {
        setProduct(result)
        addToCart(result)
        toast.success('Product Added To Cart')
      } else {
        setProduct(null)
        toast.error(result.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Server Error')
    }
  }

  const handleDetectedCode = (code) => {
    if (!code) return

    if (code === lastScannedRef.current) return

    lastScannedRef.current = code

    setData(code)
    fetchProduct(code)
  }

  useEffect(() => {
    if (!videoRef.current) return

    const codeReader = new BrowserMultiFormatReader()

    const startScanner = async () => {
      try {
        const devices =
          await BrowserMultiFormatReader.listVideoInputDevices()

        if (!devices || devices.length === 0) {
          toast.error('Camera not found')
          return
        }

        const backCamera =
          devices.find((device) =>
            device.label.toLowerCase().includes('back')
          ) || devices[0]

        await codeReader.decodeFromVideoDevice(
          backCamera.deviceId,
          videoRef.current,
          (result) => {
            if (result) {
              handleDetectedCode(result.getText())
            }
          }
        )
      } catch (error) {
        console.log(error)
        toast.error('Camera start failed')
      }
    }

    startScanner()

    return () => {
      try {
        codeReader.reset()
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-8'>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-4xl font-bold text-blue-700 mb-8 text-center'
      >
        Barcode Scanner
      </motion.h1>

      <div className='bg-white shadow-2xl rounded-3xl p-6 max-w-3xl mx-auto'>
        <div className='relative overflow-hidden rounded-2xl border-4 border-blue-500 bg-black shadow-2xl'>
          <video
            ref={videoRef}
            className='w-full h-[420px] object-cover bg-black'
            autoPlay
            muted
            playsInline
          ></video>

          <div className='absolute top-1/2 left-1/2 w-80 h-40 border-4 border-green-400 rounded-2xl transform -translate-x-1/2 -translate-y-1/2 pointer-events-none'>
            <div className='absolute -top-1 -left-1 w-12 h-12 border-t-4 border-l-4 border-white'></div>
            <div className='absolute -top-1 -right-1 w-12 h-12 border-t-4 border-r-4 border-white'></div>
            <div className='absolute -bottom-1 -left-1 w-12 h-12 border-b-4 border-l-4 border-white'></div>
            <div className='absolute -bottom-1 -right-1 w-12 h-12 border-b-4 border-r-4 border-white'></div>

            <motion.div
              initial={{ y: -70 }}
              animate={{ y: 70 }}
              transition={{
                repeat: Infinity,
                duration: 1.4,
                repeatType: 'reverse',
              }}
              className='absolute top-1/2 left-0 w-full h-1 bg-red-500'
            ></motion.div>
          </div>
        </div>

        <div className='mt-6 flex gap-3'>
          <input
            type='text'
            value={manualBarcode}
            onChange={(e) => setManualBarcode(e.target.value)}
            placeholder='Enter barcode manually'
            className='flex-1 border rounded-xl px-4 py-3'
          />

          <button
            onClick={() => {
              if (!manualBarcode) return
              setData(manualBarcode)
              fetchProduct(manualBarcode)
            }}
            className='bg-green-600 text-white px-5 py-3 rounded-xl font-bold'
          >
            Test
          </button>
        </div>

        <div className='mt-6 text-center'>
          <h2 className='text-2xl font-bold text-blue-700 mb-3'>
            Scan Result
          </h2>

          <p className='text-xl text-gray-700 bg-blue-50 rounded-xl py-3 px-4'>
            {data}
          </p>
        </div>

        {product && (
          <div className='mt-6 bg-blue-100 p-5 rounded-2xl shadow-lg'>
            <h2 className='text-2xl font-bold text-blue-700 mb-3'>
              Last Scanned Product
            </h2>

            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Description:</strong> {product.description}</p>
          </div>
        )}

        {cart.length > 0 && (
          <div className='mt-6 bg-white p-5 rounded-2xl shadow-lg border'>
            <h2 className='text-2xl font-bold text-blue-700 mb-4'>
              Cart
            </h2>

            {cart.map((item) => (
              <div
                key={item._id}
                className='flex justify-between items-center border-b py-3'
              >
                <div>
                  <h3 className='font-bold'>{item.name}</h3>
                  <p>
                    ₹{item.price} × {item.qty}
                  </p>
                </div>

                <h3 className='font-bold text-blue-700'>
                  ₹{item.price * item.qty}
                </h3>
              </div>
            ))}

            <div className='mt-4 text-right text-2xl font-bold text-green-600'>
              Total ₹{totalAmount}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Scanner