import { useState } from 'react'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const MainLayout = ({ children }) => {

  const [sidebarOpen, setSidebarOpen] =
    useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className='flex min-h-screen bg-green-50'>

      {/* Sidebar */}
      {sidebarOpen && (
        <Sidebar toggleSidebar={toggleSidebar} />
      )}

      {/* Main */}
      <div className='flex-1'>

        <Navbar
          toggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        <div className='p-6'>
          {children}
        </div>

      </div>

    </div>
  )
}

export default MainLayout