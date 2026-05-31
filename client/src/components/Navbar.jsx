import {
  Bell,
  LogOut,
  Menu,
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))
  const isAdmin = user?.role === 'admin'

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div
      className={`px-8 py-5 flex justify-between items-center shadow-md border-b transition-all duration-300 ${
        isAdmin
          ? 'bg-slate-950 text-white border-slate-800'
          : 'bg-white text-gray-800'
      }`}
    >
      {/* LEFT SECTION */}
      <div className='flex items-center gap-4'>
        {!sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className={`p-3 rounded-xl transition ${
              isAdmin
                ? 'bg-slate-800 hover:bg-slate-700'
                : 'bg-green-100 hover:bg-green-200'
            }`}
          >
            <Menu
              className={
                isAdmin
                  ? 'text-white'
                  : 'text-green-700'
              }
            />
          </button>
        )}

        {/* TITLE */}
        <div>
          <h2
            className={`text-3xl font-bold ${
              isAdmin
                ? 'text-indigo-400'
                : 'text-green-800'
            }`}
          >
            {isAdmin
              ? 'Admin Control Center'
              : 'Farmer Dashboard'}
          </h2>

          <p
            className={`mt-1 text-sm ${
              isAdmin
                ? 'text-slate-400'
                : 'text-gray-500'
            }`}
          >
            Welcome back 👋 {user?.name}
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className='flex items-center gap-6'>
        {/* NOTIFICATION */}
        <div
          className={`p-3 rounded-full cursor-pointer transition ${
            isAdmin
              ? 'bg-slate-800 hover:bg-slate-700'
              : 'bg-green-100 hover:bg-green-200'
          }`}
        >
          <Bell
            className={
              isAdmin
                ? 'text-indigo-300'
                : 'text-green-700'
            }
          />
        </div>

        {/* USER INFO */}
        <div className='text-right'>
          <h3 className='font-semibold'>
            {user?.name}
          </h3>

          <p
            className={`text-sm ${
              isAdmin
                ? 'text-indigo-300'
                : 'text-gray-500'
            }`}
          >
            {isAdmin ? 'Administrator' : 'Farmer'}
          </p>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
            isAdmin
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar