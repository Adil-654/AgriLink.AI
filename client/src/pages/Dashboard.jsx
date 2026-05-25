import { useEffect, useState } from 'react'

import MainLayout from '../layouts/MainLayout'

import StatsCard from '../components/StatsCard'
import YieldChart from '../components/YieldChart'

import {
  Truck,
  BadgeIndianRupee,
  CheckCircle,
  Clock3,
  Users,
  Tractor,
} from 'lucide-react'

import { motion } from 'framer-motion'

import api from '../services/api'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalShipments: 0,
    deliveredShipments: 0,
    pendingShipments: 0,
    totalRevenue: 0,
    totalFarmers: 0,
  })

  const fetchAnalytics = async () => {
    try {
      const response = await api.get(
        '/shipments/analytics/stats'
      )

      setStats(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  return (
    <MainLayout>
      <div className='space-y-8'>
        
        {/* TOP HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className='bg-gradient-to-r from-green-700 to-green-500 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden'
        >
          
          {/* Floating Circle */}
          <div className='absolute top-[-40px] right-[-40px] w-52 h-52 bg-white/10 rounded-full' />

          <div className='relative z-10'>
            <h1 className='text-4xl font-black'>
              AgriLink AI Dashboard
            </h1>

            <p className='mt-3 text-green-100 max-w-2xl'>
              Smart agriculture and rural
              logistics management platform
              powered by analytics and AI.
            </p>
          </div>
        </motion.div>

        {/* STATS GRID */}
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6'>
          
          <StatsCard
            title='Total Shipments'
            value={stats.totalShipments}
            icon={
              <Truck className='text-green-700' />
            }
          />

          <StatsCard
            title='Delivered'
            value={stats.deliveredShipments}
            icon={
              <CheckCircle className='text-green-700' />
            }
          />

          <StatsCard
            title='Pending'
            value={stats.pendingShipments}
            icon={
              <Clock3 className='text-yellow-600' />
            }
          />

          <StatsCard
            title='Farmers'
            value={stats.totalFarmers}
            icon={
              <Users className='text-blue-600' />
            }
          />

          <StatsCard
            title='Revenue'
            value={`₹${stats.totalRevenue}`}
            icon={
              <BadgeIndianRupee className='text-purple-600' />
            }
          />
        </div>

        {/* CHART + INFO */}
        <div className='grid lg:grid-cols-3 gap-6'>
          
          {/* CHART */}
          <div className='lg:col-span-2'>
            <YieldChart />
          </div>

          {/* SIDE CARD */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className='bg-white rounded-[30px] shadow-xl p-8 border border-gray-100 flex flex-col justify-between'
          >
            <div>
              <div className='flex items-center gap-3 mb-6'>
                <div className='bg-green-100 p-3 rounded-2xl'>
                  <Tractor className='text-green-700' />
                </div>

                <h2 className='text-2xl font-bold text-gray-800'>
                  Agriculture Insights
                </h2>
              </div>

              <div className='space-y-5'>
                
                <div className='bg-green-50 p-4 rounded-2xl'>
                  <p className='text-sm text-gray-500'>
                    Active Farmers
                  </p>

                  <h3 className='text-3xl font-black text-green-700 mt-2'>
                    {stats.totalFarmers}
                  </h3>
                </div>

                <div className='bg-blue-50 p-4 rounded-2xl'>
                  <p className='text-sm text-gray-500'>
                    Delivery Success
                  </p>

                  <h3 className='text-3xl font-black text-blue-700 mt-2'>
                    {stats.deliveredShipments}
                  </h3>
                </div>

                <div className='bg-yellow-50 p-4 rounded-2xl'>
                  <p className='text-sm text-gray-500'>
                    Pending Orders
                  </p>

                  <h3 className='text-3xl font-black text-yellow-600 mt-2'>
                    {stats.pendingShipments}
                  </h3>
                </div>
              </div>
            </div>

            {/* Footer */}
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className='mt-8 text-xs text-gray-400 text-center'
            >
              AI Powered Smart Farming System
            </motion.div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard