import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const MainLayout = ({ children }) => {
  return (
    <div className='flex min-h-screen bg-green-50'>
      <Sidebar />

      <div className='flex-1'>
        <Navbar />

        <div className='p-6'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainLayout