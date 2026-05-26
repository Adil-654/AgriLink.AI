import { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import api from '../services/api'
import { motion } from 'framer-motion'
import StatsCard from '../components/StatsCard'
import {
  Users,
  Truck,
  BadgeIndianRupee,
  CheckCircle,
  Clock3,
} from 'lucide-react'

const AdminShipments = () => {

  const [shipments, setShipments] = useState([])
    const [stats, setStats] = useState({
    totalShipments: 0,
    deliveredShipments: 0,
    pendingShipments: 0,
    totalRevenue: 0,
  })

  const fetchShipments = async () => {
    try {
      const res = await api.get('/shipments')
      setShipments(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchShipments()
  }, [])

  return (
   <MainLayout>
      <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-8 rounded-3xl shadow-lg"
        >
          <h1 className="text-3xl md:text-4xl font-bold">
            👨‍🌾 Admin Dashboard
          </h1>
          <p className="mt-2 text-green-100">
            Track your crops, shipments and earnings in real time
          </p>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* <StatsCard
            title="My Shipments"
            value={stats.totalShipments}
            icon={<Truck className="text-green-600" />}
          /> */}

          <StatsCard
            title="Delivered"
            value={stats.deliveredShipments}
            icon={<CheckCircle className="text-green-600" />}
          />

          <StatsCard
            title="Pending"
            value={stats.pendingShipments}
            icon={<Clock3 className="text-yellow-500" />}
          />

          <StatsCard
            title="Earnings"
            value={`₹${stats.totalRevenue}`}
            icon={<BadgeIndianRupee className="text-purple-600" />}
          />
        </div>

        {/* CHART SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-md">
            {/* <YieldChart /> */}
          </div>

          {/* INSIGHTS */}
          <div className="bg-white p-6 rounded-3xl shadow-md space-y-6">

            <h2 className="text-xl font-bold text-gray-800">
              📊 Insights
            </h2>

            <div className="p-4 bg-green-50 rounded-2xl">
              <p className="text-gray-500 text-sm">Total Shipments</p>
              <p className="text-2xl font-bold text-green-700">
                {stats.totalShipments}
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl">
              <p className="text-gray-500 text-sm">Delivered</p>
              <p className="text-2xl font-bold text-blue-700">
                {stats.deliveredShipments}
              </p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-2xl">
              <p className="text-gray-500 text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.pendingShipments}
              </p>
            </div>

          </div>

        </div>

      </div>
    </MainLayout>
  )
}

export default AdminShipments   // ✅ THIS IS REQUIRED