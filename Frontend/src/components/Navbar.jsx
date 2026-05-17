import { Link } from 'react-router-dom'
import { useState } from 'react'

import logo from '../image/logo.png'

const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const user = JSON.parse(localStorage.getItem('user'))

  const isAdmin = user?.role === 'admin'

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    window.location.href = '/login'
  }

  return (
    <nav className='bg-gradient-to-r from-blue-700 to-blue-500 text-white px-6 py-3 shadow-lg sticky top-0 z-50'>
      <div className='flex justify-between items-center'>
        <Link to='/'>
          <img
            src={logo}
            alt='ScanNGo Logo'
            className='h-16 object-contain'
          />
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='md:hidden text-3xl'
        >
          ☰
        </button>

        <div className='hidden md:flex gap-8 items-center text-lg font-medium'>
          <Link to='/' className='hover:text-blue-200'>
            Home
          </Link>

          <Link to='/products' className='hover:text-blue-200'>
            Products
          </Link>

          <Link to='/scanner' className='hover:text-blue-200'>
            Scanner
          </Link>

          {isAdmin && (
            <>
              <Link
                to='/admin'
                className='hover:text-blue-200'
              >
                Admin
              </Link>

              <Link
                to='/admin/orders'
                className='hover:text-blue-200'
              >
                Admin Orders
              </Link>

              <Link
                to='/admin/products'
                className='hover:text-blue-200'
              >
                Manage Products
              </Link>
            </>
          )}

          {user ? (
            <span className='font-semibold'>
              Hi, {user.name}
            </span>
          ) : (
            <>
              <Link
                to='/login'
                className='hover:text-blue-200'
              >
                Login
              </Link>

              <Link
                to='/register'
                className='bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100'
              >
                Sign Up
              </Link>
            </>
          )}

          {user && (
            <div className='relative'>
              <button
                onClick={() =>
                  setOpenProfile(!openProfile)
                }
                className='bg-white text-blue-700 w-11 h-11 rounded-full font-bold hover:bg-blue-100'
              >
                👤
              </button>

              {openProfile && (
                <div className='absolute right-0 mt-3 w-52 bg-white text-gray-700 rounded-xl shadow-xl overflow-hidden'>
                  <Link
                    to='/profile'
                    className='block px-5 py-3 hover:bg-blue-50'
                  >
                    Profile
                  </Link>

                  <Link
                    to='/my-orders'
                    className='block px-5 py-3 hover:bg-blue-50'
                  >
                    My Orders
                  </Link>

                  {isAdmin && (
                    <>
                      <Link
                        to='/admin'
                        className='block px-5 py-3 hover:bg-blue-50'
                      >
                        Admin Dashboard
                      </Link>

                      <Link
                        to='/admin/orders'
                        className='block px-5 py-3 hover:bg-blue-50'
                      >
                        Admin Orders
                      </Link>
                    </>
                  )}

                  <button
                    onClick={handleLogout}
                    className='w-full text-left px-5 py-3 hover:bg-blue-50'
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className='md:hidden flex flex-col gap-4 mt-4 text-lg font-medium'>
          <Link
            to='/'
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to='/products'
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>

          <Link
            to='/scanner'
            onClick={() => setMenuOpen(false)}
          >
            Scanner
          </Link>

          {isAdmin && (
            <>
              <Link
                to='/admin'
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>

              <Link
                to='/admin/orders'
                onClick={() => setMenuOpen(false)}
              >
                Admin Orders
              </Link>

              <Link
                to='/admin/products'
                onClick={() => setMenuOpen(false)}
              >
                Manage Products
              </Link>
            </>
          )}

          {user ? (
            <>
              <span>Hi, {user.name}</span>

              <Link
                to='/profile'
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>

              <Link
                to='/my-orders'
                onClick={() => setMenuOpen(false)}
              >
                My Orders
              </Link>

              <button
                onClick={handleLogout}
                className='text-left'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to='/login'
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to='/register'
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar