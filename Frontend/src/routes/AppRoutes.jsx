import { Routes, Route } from 'react-router-dom'

import Navbar from '../components/Navbar'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Products from '../pages/Products'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Success from '../pages/Success'

const AppRoutes = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/success' element={<Success />} />
      </Routes>
    </>
  )
}

export default AppRoutes