import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import { loginUser } from '../api/authApi'

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const data = await loginUser({
        email,
        password
      })

      localStorage.setItem('token', data.token)

      localStorage.setItem(
        'user',
        JSON.stringify(data.user)
      )

      toast.success('Login Successful')

      navigate('/products')

    } catch (error) {

      toast.error(
        error.response?.data?.message || 'Login Failed'
      )
    }
  }

  return (

    <div className='min-h-screen bg-blue-50 flex justify-center items-center px-6'>

      <form
        onSubmit={handleLogin}
        className='bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md'
      >

        <h1 className='text-4xl font-bold text-blue-700 text-center mb-8'>
          Login
        </h1>

        <input
          type='email'
          placeholder='Enter Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full border p-4 rounded-xl mb-5'
        />

        <input
          type='password'
          placeholder='Enter Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full border p-4 rounded-xl mb-6'
        />

        <button
          type='submit'
          className='bg-blue-600 hover:bg-blue-700 text-white w-full py-4 rounded-xl font-semibold'
        >
          Login
        </button>

        <p className='text-center mt-6 text-gray-600'>

          Don't have an account?

          <Link
            to='/register'
            className='text-blue-700 font-semibold ml-2'
          >
            Sign Up
          </Link>

        </p>

      </form>

    </div>
  )
}

export default Login