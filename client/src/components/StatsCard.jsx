import { motion } from 'framer-motion'

const StatsCard = ({ title, value, icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className='bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition-all'
    >
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-gray-500'>
            {title}
          </p>

          <h2 className='text-4xl font-bold mt-3 text-green-800'>
            {value}
          </h2>
        </div>

        <div className='bg-green-100 p-4 rounded-2xl'>
          {icon}
        </div>
      </div>
    </motion.div>
  )
}

export default StatsCard