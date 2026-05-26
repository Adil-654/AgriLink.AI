import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, role }) => {

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  if (!token || !user) {
    return <Navigate to='/' replace />
  }

  if (role && user.role !== role) {
    return user.role === 'admin'
      ? <Navigate to='/admin' replace />
      : <Navigate to='/dashboard' replace />
  }

  return children
}

export default ProtectedRoute