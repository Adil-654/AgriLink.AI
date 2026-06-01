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

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

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

  const fetchAdminStats = async () => {
    try {
      const res = await api.get(
        '/shipments/analytics/stats'
      )

      setStats(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchFarmers = async () => {
    try {
      const res = await api.get(
        '/admin/farmers'
      )

      setFarmers(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchAdminStats()
    fetchFarmers()
  }, [])

  const chartData = [
    {
      name: 'Farmers',
      value: stats.totalFarmers,
    },
    {
      name: 'Shipments',
      value: stats.totalShipments,
    },
    {
      name: 'Delivered',
      value: stats.deliveredShipments,
    },
    {
      name: 'Pending',
      value: stats.pendingShipments,
    },
  ]

  return (
    <MainLayout>
      <div className='p-6 space-y-8 bg-gray-50 min-h-screen'>
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-gradient-to-r from-gray-900 to-gray-700 text-white p-8 rounded-3xl shadow-lg'
        >
          <h1 className='text-3xl md:text-4xl font-bold'>
            🧑‍💼 Admin Control Panel
          </h1>

          <p className='text-gray-300 mt-2'>
            Manage farmers, shipments and system analytics
          </p>
        </motion.div>

        {/* STATS */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
          <div className='bg-white p-6 rounded-2xl shadow'>
            <Users className='text-blue-600' />
            <p className='text-gray-500 mt-2'>
              Farmers
            </p>
            <h2 className='text-2xl font-bold'>
              {stats.totalFarmers}
            </h2>
          </div>

          <div className='bg-white p-6 rounded-2xl shadow'>
            <Truck className='text-green-600' />
            <p className='text-gray-500 mt-2'>
              Shipments
            </p>
            <h2 className='text-2xl font-bold'>
              {stats.totalShipments}
            </h2>
          </div>

          <div className='bg-white p-6 rounded-2xl shadow'>
            <CheckCircle className='text-green-700' />
            <p className='text-gray-500 mt-2'>
              Delivered
            </p>
            <h2 className='text-2xl font-bold'>
              {stats.deliveredShipments}
            </h2>
          </div>

          <div className='bg-white p-6 rounded-2xl shadow'>
            <Clock3 className='text-yellow-600' />
            <p className='text-gray-500 mt-2'>
              Pending
            </p>
            <h2 className='text-2xl font-bold'>
              {stats.pendingShipments}
            </h2>
          </div>

          <div className='bg-white p-6 rounded-2xl shadow'>
            <BadgeIndianRupee className='text-purple-600' />
            <p className='text-gray-500 mt-2'>
              Revenue
            </p>
            <h2 className='text-2xl font-bold'>
              ₹{stats.totalRevenue}
            </h2>
          </div>
        </div>

        {/* BAR CHART */}
        <div className='bg-white rounded-3xl p-6 shadow-lg'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>
            📊 System Overview
          </h2>

          <ResponsiveContainer
            width='100%'
            height={350}
          >
            <BarChart data={chartData}>
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey='value'
                fill='#16a34a'
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* FARMERS TABLE */}
       
      </div>
    </MainLayout>
  )
}

export default AdminDashboard