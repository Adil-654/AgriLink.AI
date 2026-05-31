import {
  LayoutDashboard,
  Tractor,
  Truck,
  BarChart3,
  Users,
  Package,
  ChevronLeft,
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

const Sidebar = ({ toggleSidebar }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const isAdmin = user?.role === 'admin'

  const farmerMenu = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/dashboard',
    },
    {
      name: 'Crop Prediction',
      icon: <Tractor size={20} />,
      path: '/prediction',
    },
    {
      name: 'Supply Chain',
      icon: <Truck size={20} />,
      path: '/supply-chain',
    },
    {
      name: 'Analytics',
      icon: <BarChart3 size={20} />,
      path: '/analytics',
    },
  ]

  const adminMenu = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/admin',
    },
    {
      name: 'Farmers',
      icon: <Users size={20} />,
      path: '/admin/farmers',
    },
    {
      name: 'Shipments',
      icon: <Package size={20} />,
      path: '/admin/shipments',
    },
    {
      name: 'Analytics',
      icon: <BarChart3 size={20} />,
      path: '/admin/analytics',
    },
  ]

  const menu = isAdmin ? adminMenu : farmerMenu

  return (
    <div
      className={`w-72 min-h-screen p-6 relative shadow-2xl text-white transition-all duration-300 ${
        isAdmin
          ? 'bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-900'
          : 'bg-gradient-to-b from-green-900 to-green-700'
      }`}
    >
      {/* TOP */}
      <div className='flex items-center justify-between mb-12'>
        <div>
          <h1 className='text-3xl font-bold tracking-wide'>
            {isAdmin ? 'AgriLink Admin' : 'AgriLink AI'}
          </h1>

          <p
            className={`text-sm mt-2 ${
              isAdmin ? 'text-indigo-300' : 'text-green-200'
            }`}
          >
            {isAdmin
              ? 'Control & Intelligence Panel'
              : 'Smart Farming Dashboard'}
          </p>
        </div>

        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-xl transition ${
            isAdmin
              ? 'bg-indigo-800 hover:bg-indigo-700'
              : 'bg-green-800 hover:bg-green-600'
          }`}
        >
          <ChevronLeft size={22} />
        </button>
      </div>

      {/* MENU */}
      <div className='space-y-3'>
        {menu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 backdrop-blur-md ${
                isActive
                  ? isAdmin
                    ? 'bg-indigo-500/30 border border-indigo-400 text-white shadow-lg'
                    : 'bg-white text-green-800 shadow-lg'
                  : isAdmin
                  ? 'hover:bg-indigo-800/40 text-indigo-200'
                  : 'hover:bg-green-600'
              }`
            }
          >
            {item.icon}
            <span className='font-medium'>
              {item.name}
            </span>
          </NavLink>
        ))}
      </div>

      {/* FOOTER */}
      <div
        className={`absolute bottom-6 left-6 right-6 rounded-2xl p-4 text-center backdrop-blur-md ${
          isAdmin
            ? 'bg-indigo-900/40 border border-indigo-700'
            : 'bg-green-800'
        }`}
      >
        <p
          className={`text-sm ${
            isAdmin ? 'text-indigo-300' : 'text-green-200'
          }`}
        >
          Logged in as
        </p>

        <p className='font-semibold mt-1'>
          {user?.name || 'User'}
        </p>

        <p
          className={`text-xs mt-1 uppercase ${
            isAdmin ? 'text-indigo-300' : 'text-green-300'
          }`}
        >
          {isAdmin ? 'Administrator' : 'Farmer'}
        </p>
      </div>
    </div>
  )
}

export default Sidebar