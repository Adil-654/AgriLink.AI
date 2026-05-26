import { useEffect, useState } from 'react'

import MainLayout from '../layouts/MainLayout'

import { motion } from 'framer-motion'

import {
  Users,
  Truck,
  BadgeIndianRupee,
  CheckCircle,
  Clock3,
} from 'lucide-react'

import api from '../services/api'

const AdminDashboard = () => {

  const [stats, setStats] = useState({
    totalFarmers: 0,
    totalShipments: 0,
    deliveredShipments: 0,
    pendingShipments: 0,
    totalRevenue: 0,
  })

  const [farmers, setFarmers] = useState([])

  // 🔥 Fetch admin analytics
  const fetchAdminStats = async () => {
    try {
    const res = await api.get('/shipments/analytics/stats')
      setStats(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // 👨‍🌾 Fetch all farmers
  const fetchFarmers = async () => {
    try {
      const res = await api.get('/admin/farmers')
      setFarmers(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchAdminStats()
    fetchFarmers()
  }, [])

  return (
    <MainLayout>
      <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-8 rounded-3xl shadow-lg"
        >
          <h1 className="text-3xl md:text-4xl font-bold">
            🧑‍💼 Admin Control Panel
          </h1>

          <p className="text-gray-300 mt-2">
            Manage farmers, shipments and system analytics
          </p>
        </motion.div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow">
            <Users className="text-blue-600" />
            <p className="text-gray-500 mt-2">Farmers</p>
            <h2 className="text-2xl font-bold">{stats.totalFarmers}</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <Truck className="text-green-600" />
            <p className="text-gray-500 mt-2">Shipments</p>
            <h2 className="text-2xl font-bold">{stats.totalShipments}</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <CheckCircle className="text-green-700" />
            <p className="text-gray-500 mt-2">Delivered</p>
            <h2 className="text-2xl font-bold">{stats.deliveredShipments}</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <Clock3 className="text-yellow-600" />
            <p className="text-gray-500 mt-2">Pending</p>
            <h2 className="text-2xl font-bold">{stats.pendingShipments}</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <BadgeIndianRupee className="text-purple-600" />
            <p className="text-gray-500 mt-2">Revenue</p>
            <h2 className="text-2xl font-bold">₹{stats.totalRevenue}</h2>
          </div>

        </div>

        {/* FARMERS TABLE */}
        <div className="bg-white p-6 rounded-3xl shadow overflow-x-auto">

          <h2 className="text-xl font-bold mb-4">
            👨‍🌾 Farmers List
          </h2>

          <table className="w-full text-left">

            <thead>
              <tr className="border-b text-gray-500">
                <th className="p-3">Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>

              {farmers.map((f, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">

                  <td className="p-3 font-medium">
                    {f.name}
                  </td>

                  <td>{f.email}</td>

                  <td>{f.location || 'N/A'}</td>

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

export default AdminDashboard