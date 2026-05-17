import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { registerUser } from '../api/authApi'

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // NEW STATES 🔥
  const [role, setRole] = useState('customer')
  const [shopName, setShopName] = useState('')
  const [shopAddress, setShopAddress] = useState('')
  const [phone, setPhone] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      const data = await registerUser({
        name,
        email,
        password,

        // NEW DATA
        role,
        shopName,
        shopAddress,
        phone,
      })

      localStorage.setItem('token', data.token)

      localStorage.setItem(
        'user',
        JSON.stringify(data.user)
      )

      toast.success('Account Created Successfully')

      // ROLE BASED REDIRECT 🔥
      if (data.user.role === 'shopOwner') {
        navigate('/admin')
      } else {
        navigate('/products')
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Register Failed'
      )
    }
  }

  return (
    <div className='min-h-screen bg-blue-50 flex justify-center items-center px-6 py-10'>
      <form
        onSubmit={handleRegister}
        className='bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md'
      >
        <h1 className='text-4xl font-bold text-blue-700 text-center mb-8'>
          Create Account
        </h1>

        {/* NAME */}
        <input
          type='text'
          placeholder='Enter Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full border p-4 rounded-xl mb-5'
        />

        {/* EMAIL */}
        <input
          type='email'
          placeholder='Enter Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full border p-4 rounded-xl mb-5'
        />

        {/* PASSWORD */}
        <input
          type='password'
          placeholder='Enter Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full border p-4 rounded-xl mb-5'
        />

        {/* ROLE SELECT 🔥 */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className='w-full border p-4 rounded-xl mb-5'
        >
          <option value='customer'>
            Customer
          </option>

          <option value='shopOwner'>
            Shop Owner
          </option>
        </select>

        {/* SHOP OWNER FIELDS 🔥 */}
        {role === 'shopOwner' && (
          <>
            <input
              type='text'
              placeholder='Enter Shop Name'
              value={shopName}
              onChange={(e) =>
                setShopName(e.target.value)
              }
              className='w-full border p-4 rounded-xl mb-5'
            />

            <input
              type='text'
              placeholder='Enter Shop Address'
              value={shopAddress}
              onChange={(e) =>
                setShopAddress(e.target.value)
              }
              className='w-full border p-4 rounded-xl mb-5'
            />

            <input
              type='text'
              placeholder='Enter Phone Number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='w-full border p-4 rounded-xl mb-5'
            />
          </>
        )}

        {/* BUTTON */}
        <button
          type='submit'
          className='bg-blue-600 hover:bg-blue-700 text-white w-full py-4 rounded-xl font-semibold'
        >
          Sign Up
        </button>

        <p className='text-center mt-6 text-gray-600'>
          Already have an account?

          <Link
            to='/login'
            className='text-blue-700 font-semibold ml-2'
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register