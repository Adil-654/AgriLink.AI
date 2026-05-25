import { Bell } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='bg-white shadow-sm px-8 py-5 flex justify-between items-center'>
      <div>
        <h2 className='text-3xl font-bold text-green-800'>
          Farmer Dashboard
        </h2>

        <p className='text-gray-500 mt-1'>
          Welcome back 👋
        </p>
      </div>

      <div className='flex items-center gap-6'>
        <div className='bg-green-100 p-3 rounded-full cursor-pointer'>
          <Bell className='text-green-700' />
        </div>

        <div className='flex items-center gap-3'>
        

          <div>
            <h3 className='font-semibold'>Adil Ahmad</h3>
            <p className='text-sm text-gray-500'>Farmer</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar