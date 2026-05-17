import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingCart from './components/FloatingCart'
import ProtectedRoute from './components/ProtectedRoute'
import AddProduct from './pages/AddProduct'
import ProductList from './pages/ProductList'
import EditProduct from './pages/EditProduct'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import Success from './pages/Success'
import Scanner from './pages/Scanner'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import MyOrders from './pages/MyOrders'
import Admin from './pages/Admin'

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path='/' element={<Home />} />

<Route path='/products' element={<Products />} />

<Route path='/cart' element={<Cart />} />

<Route path='/login' element={<Login />} />

<Route path='/register' element={<Register />} />

<Route path='/scanner' element={<Scanner />} />

<Route path='/my-orders' element={<MyOrders />} />

<Route path='/success' element={<Success />} />

<Route
  path='/admin'
  element={
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  }
/>

<Route
  path='/admin/products'
  element={
    <ProtectedRoute>
      <ProductList />
    </ProtectedRoute>
  }
/>

<Route
  path='/admin/products/edit/:id'
  element={
    <ProtectedRoute>
      <EditProduct />
    </ProtectedRoute>
  }
/>

<Route
  path='/admin/orders'
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>

<Route
  path='/checkout'
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>

<Route
  path='/profile'
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path='/add-product'
  element={
    <ProtectedRoute>
      <AddProduct />
    </ProtectedRoute>
  }
/>

        <Route path='/success' element={<Success />} />

      </Routes>

      <FloatingCart />

      <Footer />

    </BrowserRouter>
  )
}

export default App