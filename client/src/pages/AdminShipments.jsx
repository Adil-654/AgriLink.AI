import { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import api from '../services/api'
import { motion } from 'framer-motion'
import StatsCard from '../components/StatsCard'

import {
  Truck,
  BadgeIndianRupee,
  CheckCircle,
  Clock3,
} from 'lucide-react'

const AdminShipments = () => {
  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(true)

  const [stats, setStats] = useState({
    totalShipments: 0,
    deliveredShipments: 0,
    pendingShipments: 0,
    totalRevenue: 0,
  })
const fetchShipments = async () => {
  try {
    setLoading(true)

    const res = await api.get('/shipments')
    const data = res.data

    setShipments(data)

    const deliveredShipments = data.filter(
      (item) => item.status === 'Delivered'
    )

    const pendingShipments = data.filter(
      (item) => item.status !== 'Delivered'
    )

    const totalRevenue = deliveredShipments.reduce(
      (total, item) =>
        total + (item.revenue || 0),
      0
    )

    setStats({
      totalShipments: data.length,
      deliveredShipments:
        deliveredShipments.length,
      pendingShipments:
        pendingShipments.length,
      totalRevenue,
    })
  } catch (err) {
    console.log(err)
  } finally {
    setLoading(false)
  }
}

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/shipments/${id}`, { status })
      fetchShipments()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchShipments()
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
            Shipment Management
          </h1>

          <p className='mt-2 text-slate-400'>
            Manage crop logistics and update delivery status in real-time
          </p>
        </motion.div>

        {/* STATS */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <StatsCard
            title='Delivered'
            value={stats.deliveredShipments}
            icon={<CheckCircle className='text-green-400' />}
          />

          <StatsCard
            title='Pending'
            value={stats.pendingShipments}
            icon={<Clock3 className='text-yellow-400' />}
          />

          <StatsCard
            title='Revenue'
            value={`₹${stats.totalRevenue}`}
            icon={<BadgeIndianRupee className='text-indigo-400' />}
          />
        </div>

        {/* SHIPMENTS */}
        <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6'>
          
          <h2 className='text-2xl font-bold mb-6'>
            All Shipments
          </h2>

          {loading ? (
            <div className='text-center text-slate-400 py-10'>
              Loading shipments...
            </div>
          ) : shipments.length === 0 ? (
            <div className='text-center text-slate-400 py-10'>
              No shipments found
            </div>
          ) : (
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {shipments.map((shipment) => (
                <div
                  key={shipment._id}
                  className='bg-slate-900/40 border border-white/10 rounded-3xl p-6 hover:scale-[1.01] transition'
                >
                  {/* TOP */}
                  <div className='flex justify-between items-start'>
                    <div>
                      <div className='flex items-center gap-3 mb-4'>
                        <Truck className='text-indigo-400' />

                        <h3 className='text-2xl font-bold'>
                          {shipment.crop}
                        </h3>
                      </div>

                      <p className='text-slate-300'>
                        <span className='text-slate-400'>
                          Farmer:
                        </span>{' '}
                        {shipment.farmerName}
                      </p>

                      <p className='text-slate-300'>
                        <span className='text-slate-400'>
                          Destination:
                        </span>{' '}
                        {shipment.destination}
                      </p>

                      <p className='text-slate-300'>
                        <span className='text-slate-400'>
                          Quantity:
                        </span>{' '}
                        {shipment.quantity} KG
                      </p>


                      <p className='text-slate-300'>
  <span className='text-slate-400'>
    Price/KG:
  </span>{' '}
  ₹{shipment.pricePerKg}
</p>

<p className='text-green-400 font-bold text-lg mt-2'>
  Revenue: ₹{shipment.revenue}
</p>
                    </div>

                    {/* STATUS BADGE */}
                    <span
                      className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${
                        shipment.status === 'Delivered'
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                          : shipment.status === 'In Transit'
                          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                          : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}
                    >
                      {shipment.status}
                    </span>
                  </div>

                  {/* UPDATE STATUS */}
                  <div className='mt-6'>
                    <select
                      value={shipment.status}
                      onChange={(e) =>
                        updateStatus(
                          shipment._id,
                          e.target.value
                        )
                      }
                      className='w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white outline-none'
                    >
                      <option value='Pending'>Pending</option>
                      <option value='In Transit'>In Transit</option>
                      <option value='Delivered'>Delivered</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default AdminShipments