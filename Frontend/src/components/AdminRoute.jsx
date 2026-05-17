import { Navigate } from 'react-router-dom'

function AdminRoute({ children }) {
  // Get user from localStorage
  const user = JSON.parse(
    localStorage.getItem('user')
  )

  // Not logged in
  if (!user) {
    return <Navigate to='/login' />
  }

  // Not shop owner
  if (user.role !== 'shopOwner') {
    return <Navigate to='/products' />
  }

  // Allow access
  return children
}

export default AdminRoute