import { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/browser'
import toast from 'react-hot-toast'

function AddProduct() {
  const videoRef = useRef(null)
  const codeReaderRef = useRef(null)
  const controlsRef = useRef(null)

  const [scannerOpen, setScannerOpen] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    barcode: '',
    image: '',
  })

  const getToken = () => {
    const directToken = localStorage.getItem('token')

    if (directToken) return directToken

    const userInfo = localStorage.getItem('userInfo')

    if (userInfo) {
      return JSON.parse(userInfo)?.token
    }

    return null
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const stopScanner = () => {
    if (controlsRef.current) {
      controlsRef.current.stop()
      controlsRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.pause()

      if (videoRef.current.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop())

        videoRef.current.srcObject = null
      }
    }

    codeReaderRef.current = null
    setScannerOpen(false)
  }

  const startScanner = () => {
    setScannerOpen(true)

    setTimeout(async () => {
      try {
        const codeReader = new BrowserMultiFormatReader()
        codeReaderRef.current = codeReader

        const devices = await BrowserMultiFormatReader.listVideoInputDevices()

        if (!devices || devices.length === 0) {
          toast.error('Camera not found')
          setScannerOpen(false)
          return
        }

        const selectedDevice =
          devices.find((device) =>
            device.label.toLowerCase().includes('back')
          ) || devices[0]

        const controls = await codeReader.decodeFromVideoDevice(
          selectedDevice.deviceId,
          videoRef.current,
          (result) => {
            if (result) {
              const code = result.getText()

              setFormData((prev) => ({
                ...prev,
                barcode: code,
              }))

              toast.success(`Barcode Scanned: ${code}`)
              stopScanner()
            }
          }
        )

        controlsRef.current = controls
      } catch (error) {
        console.log(error)
        toast.error('Camera start failed')
        stopScanner()
      }
    }, 300)
  }

  const uploadImage = async () => {
    if (!imageFile) return ''

    const token = getToken()

    if (!token) {
      throw new Error('Login token not found. Please login again.')
    }

    const data = new FormData()
    data.append('image', imageFile)

    const res = await fetch('https://scanngo-iwua.onrender.com/api/upload/image', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })

    const result = await res.json()

    if (!res.ok) {
      throw new Error(result.message || 'Image upload failed')
    }

    return result.imageUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const token = getToken()

      if (!token) {
        toast.error('Login token not found. Please login again.')
        return
      }

      let imageUrl = formData.image

      if (imageFile) {
        imageUrl = await uploadImage()
      }

      const productData = {
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        description: formData.description,
        barcode: formData.barcode,
        image: imageUrl,
      }

      const res = await fetch('https://scanngo-iwua.onrender.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      })

      const result = await res.json()

      if (res.ok) {
        toast.success('Product Added Successfully')

        setFormData({
          name: '',
          price: '',
          category: '',
          description: '',
          barcode: '',
          image: '',
        })

        setImageFile(null)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message || 'Product add failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => {
      stopScanner()
    }
  }, [])

  return (
    <div className='min-h-screen bg-blue-50 p-8'>
      <h1 className='text-4xl font-bold text-blue-700 mb-8 text-center'>
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-2xl rounded-2xl p-6 max-w-2xl mx-auto'
      >
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Product Name'
          className='w-full border p-3 rounded-xl mb-4'
          required
        />

        <input
          type='number'
          name='price'
          value={formData.price}
          onChange={handleChange}
          placeholder='Price'
          className='w-full border p-3 rounded-xl mb-4'
          required
        />

        <input
          type='text'
          name='category'
          value={formData.category}
          onChange={handleChange}
          placeholder='Category'
          className='w-full border p-3 rounded-xl mb-4'
          required
        />

        <textarea
          name='description'
          value={formData.description}
          onChange={handleChange}
          placeholder='Description'
          className='w-full border p-3 rounded-xl mb-4'
          required
        />

        <div className='mb-4'>
          <label className='font-bold text-gray-700'>Product Image</label>

          <input
            type='file'
            accept='image/*'
            onChange={(e) => setImageFile(e.target.files[0])}
            className='w-full border p-3 rounded-xl mt-2'
          />
        </div>

        <div className='mb-4'>
          <label className='font-bold text-gray-700'>Barcode</label>

          <div className='flex gap-3 mt-2'>
            <input
              type='text'
              name='barcode'
              value={formData.barcode}
              onChange={handleChange}
              placeholder='Enter barcode manually'
              className='flex-1 border p-3 rounded-xl'
              required
            />

            <button
              type='button'
              onClick={startScanner}
              disabled={scannerOpen}
              className='bg-green-600 text-white px-4 rounded-xl font-bold disabled:bg-gray-400'
            >
              {scannerOpen ? 'Scanning...' : 'Scan'}
            </button>
          </div>
        </div>

        {scannerOpen && (
          <div className='mb-5 bg-black p-3 rounded-xl'>
            <video
              ref={videoRef}
              className='w-full h-72 object-cover rounded-xl'
              autoPlay
              muted
              playsInline
            ></video>

            <button
              type='button'
              onClick={stopScanner}
              className='mt-3 bg-red-600 text-white px-4 py-2 rounded-xl'
            >
              Stop Scanner
            </button>
          </div>
        )}

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold disabled:bg-gray-400'
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  )
}

export default AddProduct