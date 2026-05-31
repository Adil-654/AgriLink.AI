import { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import api from '../services/api'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'

const AdminFarmers = () => {
  const [farmers, setFarmers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFarmers = async () => {
    try {
      setLoading(true)
      const res = await api.get('/admin/farmers')
      setFarmers(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFarmers()
  }, [])

  return (
    <MainLayout>
      <div className='p-6 space-y-6 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 min-h-screen text-white'>
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl'
        >
          <div className='flex items-center gap-4'>
            <div className='bg-indigo-500/20 p-4 rounded-2xl border border-indigo-400/30'>
              <Users className='text-indigo-400' size={32} />
            </div>

            <div>
              <h1 className='text-4xl font-black'>
                Farmers Management
              </h1>

              <p className='text-slate-400 mt-2'>
                Monitor and manage all registered farmers
              </p>
            </div>
          </div>
        </motion.div>

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='grid grid-cols-1 md:grid-cols-3 gap-6'
        >
          <div className='bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl'>
            <p className='text-slate-400 text-sm'>Total Farmers</p>
            <h2 className='text-5xl font-black text-indigo-400 mt-3'>
              {farmers.length}
            </h2>
          </div>

          <div className='bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl'>
            <p className='text-slate-400 text-sm'>Active Users</p>
            <h2 className='text-5xl font-black text-green-400 mt-3'>
              {farmers.length}
            </h2>
          </div>

          <div className='bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl'>
            <p className='text-slate-400 text-sm'>
              Registered This Month
            </p>

            <h2 className='text-5xl font-black text-purple-400 mt-3'>
              {
                farmers.filter(
                  (f) =>
                    new Date(f.createdAt).getMonth() ===
                    new Date().getMonth()
                ).length
              }
            </h2>
          </div>
        </motion.div>

        {/* TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden'
        >
          <div className='p-6 border-b border-white/10'>
            <h2 className='text-2xl font-bold'>
              Registered Farmers
            </h2>

            <p className='text-slate-400 mt-1'>
              All farmer accounts in the system
            </p>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-slate-900/50 text-slate-300'>
                  <th className='p-4 text-left'>Name</th>
                  <th className='p-4 text-left'>Email</th>
                  <th className='p-4 text-left'>Role</th>
                  <th className='p-4 text-left'>Joined</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan='4'
                      className='text-center py-12 text-slate-400'
                    >
                      Loading farmers...
                    </td>
                  </tr>
                ) : farmers.length > 0 ? (
                  farmers.map((farmer) => (
                    <tr
                      key={farmer._id}
                      className='border-t border-white/5 hover:bg-white/5 transition'
                    >
                      <td className='p-4 font-medium'>
                        {farmer.name}
                      </td>

                      <td className='p-4 text-slate-300'>
                        {farmer.email}
                      </td>

                      <td className='p-4'>
                        <span className='bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm border border-indigo-400/30'>
                          {farmer.role}
                        </span>
                      </td>

                      <td className='p-4 text-slate-400'>
                        {new Date(
                          farmer.createdAt
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan='4'
                      className='text-center py-12 text-slate-500'
                    >
                      No farmers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  )
}

export default AdminFarmers