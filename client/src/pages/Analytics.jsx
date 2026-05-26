import MainLayout from '../layouts/MainLayout'

import {
  BarChart3,
  Truck,
  BadgeIndianRupee,
  Users,
  CheckCircle,
  Clock3,
} from 'lucide-react'

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

import { motion } from 'framer-motion'

const shipmentData = [
  {
    month: 'Jan',
    shipments: 40,
  },
  {
    month: 'Feb',
    shipments: 65,
  },
  {
    month: 'Mar',
    shipments: 80,
  },
  {
    month: 'Apr',
    shipments: 55,
  },
  {
    month: 'May',
    shipments: 95,
  },
]

const deliveryData = [
  {
    name: 'Delivered',
    value: 70,
  },
  {
    name: 'Pending',
    value: 20,
  },
  {
    name: 'In Transit',
    value: 10,
  },
]

const COLORS = [
  '#16a34a',
  '#eab308',
  '#2563eb',
]

const Analytics = () => {
  return (
    <MainLayout>
      <div className='space-y-8'>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-gradient-to-r from-green-700 to-green-500 rounded-[30px] p-8 text-white shadow-2xl'
        >
          <div className='flex items-center gap-4'>
            <div className='bg-white/20 p-4 rounded-2xl'>
              <BarChart3 size={36} />
            </div>

            <div>
              <h1 className='text-4xl font-black'>
                Analytics Dashboard
              </h1>

              <p className='mt-2 text-green-100'>
                Real-time agriculture and supply chain insights.
              </p>
            </div>
          </div>
        </motion.div>

        {/* STATS */}
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6'>

          <div className='bg-white rounded-3xl p-6 shadow-lg border border-gray-100'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-500 text-sm'>
                  Total Shipments
                </p>

                <h2 className='text-3xl font-black mt-2'>
                  320
                </h2>
              </div>

              <div className='bg-green-100 p-4 rounded-2xl'>
                <Truck className='text-green-700' />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-3xl p-6 shadow-lg border border-gray-100'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-500 text-sm'>
                  Delivered
                </p>

                <h2 className='text-3xl font-black mt-2'>
                  240
                </h2>
              </div>

              <div className='bg-green-100 p-4 rounded-2xl'>
                <CheckCircle className='text-green-700' />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-3xl p-6 shadow-lg border border-gray-100'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-500 text-sm'>
                  Pending
                </p>

                <h2 className='text-3xl font-black mt-2'>
                  52
                </h2>
              </div>

              <div className='bg-yellow-100 p-4 rounded-2xl'>
                <Clock3 className='text-yellow-600' />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-3xl p-6 shadow-lg border border-gray-100'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-500 text-sm'>
                  Farmers
                </p>

                <h2 className='text-3xl font-black mt-2'>
                  148
                </h2>
              </div>

              <div className='bg-blue-100 p-4 rounded-2xl'>
                <Users className='text-blue-700' />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-3xl p-6 shadow-lg border border-gray-100'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-500 text-sm'>
                  Revenue
                </p>

                <h2 className='text-3xl font-black mt-2'>
                  ₹82K
                </h2>
              </div>

              <div className='bg-purple-100 p-4 rounded-2xl'>
                <BadgeIndianRupee className='text-purple-700' />
              </div>
            </div>
          </div>
        </div>

        {/* CHARTS */}
        <div className='grid lg:grid-cols-3 gap-6'>

          {/* BAR CHART */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='lg:col-span-2 bg-white rounded-3xl shadow-xl p-6 border border-gray-100'
          >
            <div className='mb-6'>
              <h2 className='text-2xl font-bold text-gray-800'>
                Monthly Shipments
              </h2>

              <p className='text-gray-500 mt-1'>
                Shipment growth overview
              </p>
            </div>

            <ResponsiveContainer width='100%' height={320}>
              <BarChart data={shipmentData}>
                <XAxis dataKey='month' />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey='shipments'
                  radius={[10, 10, 0, 0]}
                  fill='#16a34a'
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* PIE CHART */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='bg-white rounded-3xl shadow-xl p-6 border border-gray-100 flex flex-col items-center justify-center'
          >
            <div className='mb-6 text-center'>
              <h2 className='text-2xl font-bold text-gray-800'>
                Delivery Status
              </h2>

              <p className='text-gray-500 mt-1'>
                Current shipment distribution
              </p>
            </div>

            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={deliveryData}
                  dataKey='value'
                  cx='50%'
                  cy='50%'
                  outerRadius={100}
                  label
                >
                  {deliveryData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Analytics
