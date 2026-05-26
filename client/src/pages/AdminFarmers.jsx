import { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import api from '../services/api'
import { motion } from 'framer-motion'

const AdminFarmers = () => {

  const [farmers, setFarmers] = useState([])

  const fetchFarmers = async () => {
    try {
      const res = await api.get('/admin/farmers')
      setFarmers(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchFarmers()
  }, [])

  return (
    <MainLayout>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-700 text-white p-6 rounded-2xl"
        >
          <h1 className="text-3xl font-bold">👨‍🌾 Farmers Management</h1>
          <p>View all registered farmers</p>
        </motion.div>

        {/* TABLE */}
        <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b text-gray-500">
                <th className="p-3">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>
              {farmers.map((f, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">

                  <td className="p-3 font-medium">
                    {f.name}
                  </td>

                  <td>{f.email}</td>

                  <td>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {f.role}
                    </span>
                  </td>

                  <td>
                    {new Date(f.createdAt).toLocaleDateString()}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </MainLayout>
  )
}

export default AdminFarmers