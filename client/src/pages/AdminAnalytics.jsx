import { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import api from '../services/api'
import { motion } from 'framer-motion'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

import {
  Truck,
  BadgeIndianRupee,
  CheckCircle,
  Clock3,
} from 'lucide-react'

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444']

const AdminAnalytics = () => {
  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(true)

  const [stats, setStats] = useState({
    total: 0,
    delivered: 0,
    pending: 0,
    revenue: 0,
  })

  const [monthlyData, setMonthlyData] = useState([])
  const [statusData, setStatusData] = useState([])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)

      const res = await api.get('/shipments')
      const data = res.data

      setShipments(data)

      // BASIC STATS
      const delivered = data.filter(
        (s) => s.status === 'Delivered'
      ).length

      const pending = data.filter(
        (s) => s.status !== 'Delivered'
      ).length

      const revenue = data.reduce(
        (sum, s) => sum + (s.amount || 0),
        0
      )

      setStats({
        total: data.length,
        delivered,
        pending,
        revenue,
      })

      // STATUS PIE DATA
      setStatusData([
        { name: 'Delivered', value: delivered },
        { name: 'Pending', value: pending },
      ])

      // MONTHLY GROUPING
      const months = {}

      data.forEach((item) => {
        const date = new Date(item.createdAt)
        const month = date.toLocaleString('default', {
          month: 'short',
        })

        if (!months[month]) {
          months[month] = 0
        }

        months[month] += 1
      })

      const formatted = Object.keys(months).map((m) => ({
        month: m,
        shipments: months[m],
      }))

      setMonthlyData(formatted)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  return (
    <MainLayout>
      <div className='p-6 space-y-8 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white'>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl'
        >
          <h1 className='text-4xl font-black'>
            Analytics Dashboard
          </h1>

          <p className='text-slate-400 mt-2'>
            Real-time insights of shipments, revenue & performance
          </p>
        </motion.div>

        {/* STATS */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>

          <div className='bg-white/5 border border-white/10 rounded-3xl p-6'>
            <p className='text-slate-400'>Total</p>
            <h2 className='text-4xl font-black text-indigo-400'>
              {stats.total}
            </h2>
          </div>

          <div className='bg-white/5 border border-white/10 rounded-3xl p-6'>
            <p className='text-slate-400'>Delivered</p>
            <h2 className='text-4xl font-black text-green-400'>
              {stats.delivered}
            </h2>
          </div>

          <div className='bg-white/5 border border-white/10 rounded-3xl p-6'>
            <p className='text-slate-400'>Pending</p>
            <h2 className='text-4xl font-black text-yellow-400'>
              {stats.pending}
            </h2>
          </div>

          <div className='bg-white/5 border border-white/10 rounded-3xl p-6'>
            <p className='text-slate-400'>Revenue</p>
            <h2 className='text-4xl font-black text-purple-400'>
              ₹{stats.revenue}
            </h2>
          </div>
        </div>

        {/* CHARTS */}
        <div className='grid lg:grid-cols-3 gap-6'>

          {/* BAR CHART */}
          <div className='lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6'>
            <h2 className='text-xl font-bold mb-4'>
              Monthly Shipments
            </h2>

            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey='month' stroke='#94a3b8' />
                <YAxis stroke='#94a3b8' />
                <Tooltip />
                <Bar
                  dataKey='shipments'
                  fill='#6366f1'
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* PIE CHART */}
          <div className='bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center'>
            <h2 className='text-xl font-bold mb-4'>
              Status Distribution
            </h2>

            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey='value'
                  cx='50%'
                  cy='50%'
                  outerRadius={100}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default AdminAnalytics