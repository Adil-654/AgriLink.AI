import {
  Bell,
  LogOut,
  Menu,
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'

const Navbar = ({
  toggleSidebar,
  sidebarOpen,
}) => {

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const isAdmin = user?.role === 'admin'

  return (
    <div className='bg-white shadow-sm px-8 py-5 flex justify-between items-center'>

      {/* LEFT SECTION */}
      <div className='flex items-center gap-4'>

        {!sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className='bg-green-100 p-3 rounded-xl hover:bg-green-200 transition'
          >
            <Menu className='text-green-700' />
          </button>
        )}

        {/* TITLE (ROLE BASED) */}
        <div>
          <h2 className='text-3xl font-bold text-green-800'>

            {isAdmin ? 'Admin Dashboard' : 'Farmer Dashboard'}

          </h2>

          <p className='text-gray-500 mt-1'>
            Welcome back 👋 {user?.name}
          </p>
        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className='flex items-center gap-6'>

        <div className='bg-green-100 p-3 rounded-full cursor-pointer'>
          <Bell className='text-green-700' />
        </div>

        <div>
          <h3 className='font-semibold'>
            {user?.name}
          </h3>

          <p className='text-sm text-gray-500'>
            {isAdmin ? 'Admin' : 'Farmer'}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className='flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition'
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </div>
  )
}

export default Navbar