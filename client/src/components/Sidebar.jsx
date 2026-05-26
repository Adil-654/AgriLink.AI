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

  // FARMER MENU
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

  // ADMIN MENU (with /admin prefix)
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
    <div className='w-72 min-h-screen bg-gradient-to-b from-green-900 to-green-700 text-white p-6 relative shadow-2xl'>

      {/* TOP */}
      <div className='flex items-center justify-between mb-12'>

        <div>
          <h1 className='text-3xl font-bold tracking-wide'>
            AgriLink AI
          </h1>

          <p className='text-green-200 text-sm mt-2'>
            {isAdmin ? 'Admin Panel' : 'Smart Farming Dashboard'}
          </p>
        </div>

        <button
          onClick={toggleSidebar}
          className='bg-green-800 p-2 rounded-lg hover:bg-green-600 transition'
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
              `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300
              
              ${
                isActive
                  ? 'bg-white text-green-800 shadow-lg'
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
    </div>
  )
}

export default Sidebar