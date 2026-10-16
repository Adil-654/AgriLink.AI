
import { useEffect, useRef, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import {
  Users,
  Truck,
  BadgeIndianRupee,
  CheckCircle,
  Clock3,
  TrendingUp,
  Activity,
} from 'lucide-react'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

import api from '../services/api'

gsap.registerPlugin(useGSAP)

const AdminDashboard = () => {
  const container = useRef(null)
  const chartRef = useRef(null)

  const [stats, setStats] = useState({
    totalFarmers: 0,
    totalShipments: 0,
    deliveredShipments: 0,
    pendingShipments: 0,
    totalRevenue: 0,
  })

  const [farmers, setFarmers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, farmersRes] = await Promise.all([
          api.get('/shipments/analytics/stats'),
          api.get('/admin/farmers'),
        ])

        setStats(statsRes.data)
        setFarmers(farmersRes.data)
      } catch (err) {
        console.error('Dashboard loading failed:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      tl.fromTo(
        '.dashboard-header',
        { opacity: 0, y: -35, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      )
        .fromTo(
          '.stat-card',
          {
            opacity: 0,
            y: 45,
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.12,
          },
          '-=0.35'
        )
        .fromTo(
          '.dashboard-section',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.18,
          },
          '-=0.2'
        )

      gsap.fromTo(
        '.header-glow',
        { x: '-40%', opacity: 0.15 },
        {
          x: '40%',
          opacity: 0.35,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        }
      )

      gsap.utils.toArray('.stat-card').forEach((card) => {
        const onEnter = () => {
          gsap.to(card, {
            y: -8,
            scale: 1.025,
            duration: 0.25,
            boxShadow: '0 20px 45px rgba(15, 23, 42, 0.12)',
            ease: 'power2.out',
          })
        }

        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)',
            ease: 'power2.out',
          })
        }

        card.addEventListener('mouseenter', onEnter)
        card.addEventListener('mouseleave', onLeave)

        // GSAP context cleanup handles the animations.
        // Remove native listeners when the component unmounts.
        const cleanup = () => {
          card.removeEventListener('mouseenter', onEnter)
          card.removeEventListener('mouseleave', onLeave)
        }

        gsap.context(() => {}).add(cleanup)
      })
    },
    { scope: container }
  )

  useGSAP(
    () => {
      if (loading) return

      gsap.fromTo(
        '.chart-container',
        { opacity: 0, scale: 0.96, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }
      )
    },
    { dependencies: [loading], scope: container }
  )

  const chartData = [
    { name: 'Farmers', value: Number(stats.totalFarmers) || 0 },
    { name: 'Shipments', value: Number(stats.totalShipments) || 0 },
    { name: 'Delivered', value: Number(stats.deliveredShipments) || 0 },
    { name: 'Pending', value: Number(stats.pendingShipments) || 0 },
  ]

  const statCards = [
    {
      title: 'Total Farmers',
      value: stats.totalFarmers,
      icon: Users,
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600',
      description: 'Registered farmers',
    },
    {
      title: 'Total Shipments',
      value: stats.totalShipments,
      icon: Truck,
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-600',
      description: 'All shipments',
    },
    {
      title: 'Delivered',
      value: stats.deliveredShipments,
      icon: CheckCircle,
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      description: 'Successfully delivered',
    },
    {
      title: 'Pending',
      value: stats.pendingShipments,
      icon: Clock3,
      color: 'amber',
      gradient: 'from-amber-400 to-orange-500',
      description: 'Awaiting delivery',
    },
    {
      title: 'Total Revenue',
      value: stats.totalRevenue,
      icon: BadgeIndianRupee,
      color: 'purple',
      gradient: 'from-violet-500 to-purple-700',
      description: 'Recorded revenue',
      currency: true,
    },
  ]

  return (
    <MainLayout>
      <div
        ref={container}
        className="min-h-screen overflow-hidden bg-slate-50 p-4 md:p-6 lg:p-8"
      >
        {/* HEADER */}
        <div className="dashboard-header relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-7 text-white shadow-2xl md:p-10">
          <div className="header-glow pointer-events-none absolute -left-20 top-0 h-64 w-96 rounded-full bg-indigo-500 blur-[100px]" />

          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-indigo-100 backdrop-blur-md">
                <Activity size={16} className="text-emerald-400" />
                Admin Analytics
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
                Admin Control Panel
              </h1>

              <p className="mt-3 max-w-xl text-sm text-slate-300 md:text-base">
                Monitor farmers, shipments and revenue from your
                AgriLink management dashboard.
              </p>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="hidden h-24 w-24 items-center justify-center rounded-3xl border border-white/15 bg-white/10 shadow-xl backdrop-blur-lg md:flex"
            >
              <TrendingUp size={46} className="text-emerald-400" />
            </motion.div>
          </div>

          <div className="relative z-10 mt-8 flex items-center gap-2 text-sm text-slate-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            {loading ? 'Loading dashboard data...' : 'Dashboard data loaded'}
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {statCards.map((item, index) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className="stat-card group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_4px_12px_rgba(15,23,42,0.05)]"
              >
                <div
                  className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${item.gradient} opacity-[0.08] transition-transform duration-500 group-hover:scale-150`}
                />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {item.title}
                    </p>

                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
                      {loading
                        ? '...'
                        : item.currency
                          ? `₹${Number(item.value || 0).toLocaleString('en-IN')}`
                          : Number(item.value || 0).toLocaleString('en-IN')}
                    </h2>
                  </div>

                  <div
                    className={`rounded-2xl bg-gradient-to-br ${item.gradient} p-3 text-white shadow-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
                  >
                    <Icon size={23} />
                  </div>
                </div>

                <div className="relative mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
                  <span
                    className={`h-2 w-2 rounded-full bg-gradient-to-r ${item.gradient}`}
                  />
                  <p className="text-xs text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* ANALYTICS CHART */}
        <div className="dashboard-section chart-container mt-8 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm md:p-8">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
                System Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Comparison of farmers and shipment activity
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
              <Activity size={16} />
              Live dashboard data
            </div>
          </div>

          <div ref={chartRef} className="h-[320px] w-full md:h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 15, right: 10, left: -15, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />

                <Tooltip
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{
                    borderRadius: '14px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 8px 30px rgba(15,23,42,0.08)',
                    padding: '12px 16px',
                  }}
                />

                <Bar
                  dataKey="value"
                  name="Total"
                  fill="#10b981"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={65}
                  isAnimationActive
                  animationDuration={1400}
                  animationEasing="ease-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* FARMERS SECTION */}
        <div className="dashboard-section mt-8 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Registered Farmers
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Farmers available in the system
              </p>
            </div>

            <div className="w-fit rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {farmers.length} farmers
            </div>
          </div>

          {loading ? (
            <div className="space-y-4 p-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-14 animate-pulse rounded-xl bg-slate-100"
                />
              ))}
            </div>
          ) : farmers.length === 0 ? (
            <div className="p-12 text-center">
              <Users
                size={42}
                className="mx-auto mb-4 text-slate-300"
              />
              <p className="font-semibold text-slate-700">
                No farmers found
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Registered farmers will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Farmer</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {farmers.map((farmer, index) => (
                    <motion.tr
                      key={farmer._id || farmer.id || index}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.35,
                        delay: Math.min(index * 0.04, 0.3),
                      }}
                      className="transition-colors hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 font-bold text-white">
                            {(farmer.name || farmer.fullName || 'F')
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <span className="font-semibold text-slate-800">
                            {farmer.name || farmer.fullName || 'Unnamed Farmer'}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {farmer.email || '—'}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Registered
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default AdminDashboard
