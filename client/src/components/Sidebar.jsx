import {
  LayoutDashboard,
  Tractor,
  Truck,
  BarChart3,
  LogOut,
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const menu = [
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

    return (
    <div className='w-72 bg-gradient-to-b from-green-900 to-green-700 text-white p-6 hidden lg:block'>
      <h1 className='text-3xl font-bold mb-12'>
        AgriLink AI
      </h1>

      <div className='space-y-4'>
        {menu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className='flex items-center gap-4 p-4 rounded-xl hover:bg-green-600 transition duration-300'
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className='absolute bottom-10'>
        <button className='flex items-center gap-3 bg-red-500 px-6 py-3 rounded-xl'>
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
     )
}

export default Sidebar