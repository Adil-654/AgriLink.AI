import { useEffect, useState } from 'react'

import MainLayout from '../layouts/MainLayout'
import StatsCard from '../components/StatsCard'
import YieldChart from '../components/YieldChart'

import {
  Truck,
  BadgeIndianRupee,
  CheckCircle,
  Clock3,
} from 'lucide-react'

import { motion } from 'framer-motion'
import api from '../services/api'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalShipments: 0,
    deliveredShipments: 0,
    pendingShipments: 0,
    totalRevenue: 0,
  })

  const [prices, setPrices] = useState([])

  const fetchPrices = async () => {
    try {
      const res = await api.get('/market/prices')
      setPrices(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchFarmerStats = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem('user')
      )

      const res = await api.get(
        `/shipments/my-stats/${user._id}`
      )

      setStats(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchFarmerStats()
    fetchPrices()
  }, [])

  return (
    <MainLayout>
      <div className='p-6 space-y-8 bg-gray-50 min-h-screen'>
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-gradient-to-r from-green-600 to-emerald-500 text-white p-8 rounded-3xl shadow-lg'
        >
          <h1 className='text-3xl md:text-4xl font-bold'>
            👨‍🌾 Farmer Dashboard
          </h1>

          <p className='mt-2 text-green-100'>
            Track your crops, shipments and
            earnings in real time
          </p>
        </motion.div>

        {/* STATS */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <StatsCard
            title='My Shipments'
            value={stats.totalShipments}
            icon={<Truck className='text-green-600' />}
          />

          <StatsCard
            title='Delivered'
            value={stats.deliveredShipments}
            icon={
              <CheckCircle className='text-green-600' />
            }
          />

          <StatsCard
            title='Pending'
            value={stats.pendingShipments}
            icon={<Clock3 className='text-yellow-500' />}
          />

          <StatsCard
            title='Earnings'
            value={`₹${stats.totalRevenue}`}
            icon={
              <BadgeIndianRupee className='text-purple-600' />
            }
          />
        </div>

        {/* CHART + INSIGHTS */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2 bg-white p-6 rounded-3xl shadow-md'>
            <YieldChart />
          </div>

          <div className='bg-white p-6 rounded-3xl shadow-md space-y-6'>
            <h2 className='text-xl font-bold text-gray-800'>
              📊 Insights
            </h2>

            <div className='p-4 bg-green-50 rounded-2xl'>
              <p className='text-gray-500 text-sm'>
                Total Shipments
              </p>

              <p className='text-2xl font-bold text-green-700'>
                {stats.totalShipments}
              </p>
            </div>

            <div className='p-4 bg-blue-50 rounded-2xl'>
              <p className='text-gray-500 text-sm'>
                Delivered
              </p>

              <p className='text-2xl font-bold text-blue-700'>
                {stats.deliveredShipments}
              </p>
            </div>

            <div className='p-4 bg-yellow-50 rounded-2xl'>
              <p className='text-gray-500 text-sm'>
                Pending
              </p>

              <p className='text-2xl font-bold text-yellow-600'>
                {stats.pendingShipments}
              </p>
            </div>

            <div className='p-4 bg-purple-50 rounded-2xl'>
              <p className='text-gray-500 text-sm'>
                Total Earnings
              </p>

              <p className='text-2xl font-bold text-purple-700'>
                ₹{stats.totalRevenue}
              </p>
            </div>
          </div>
        </div>

        {/* MARKET PRICES */}
        <div className='bg-white p-6 rounded-3xl shadow-md'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold text-gray-800'>
              🌾 Current Market Prices
            </h2>

            <span className='text-sm text-gray-500'>
              Updated Today
            </span>
          </div>

          {prices.length === 0 ? (
            <div className='text-center py-10 text-gray-500'>
              Loading market prices...
            </div>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
              {prices.map((item) => (
                <div
                  key={item.crop}
                  className='bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-2xl p-5 hover:shadow-lg transition-all'
                >
                  <h3 className='font-bold text-green-700 text-lg'>
                    {item.crop}
                  </h3>

                  <p className='text-3xl font-black text-gray-800 mt-2'>
                    ₹{item.pricePerKg}
                  </p>

                  <p className='text-sm text-gray-500'>
                    Per KG
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard