
import { useEffect, useState, useRef } from 'react'
import MainLayout from '../layouts/MainLayout'
import api from '../services/api'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import {
  Truck,
  BadgeIndianRupee,
  CheckCircle,
  Clock3,
  Package,
  MapPin,
  RefreshCw,
  Search,
  ArrowUpRight,
  Sprout,
} from 'lucide-react'

gsap.registerPlugin(useGSAP)

const AdminShipments = () => {
  const container = useRef(null)

  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [updatingId, setUpdatingId] = useState(null)
  const [error, setError] = useState('')

  const [stats, setStats] = useState({
    totalShipments: 0,
    deliveredShipments: 0,
    pendingShipments: 0,
    totalRevenue: 0,
  })

  const fetchShipments = async () => {
    try {
      setLoading(true)
      setError('')

      const res = await api.get('/shipments')
      const data = Array.isArray(res.data) ? res.data : []

      setShipments(data)
      calculateStats(data)
    } catch (err) {
      console.error('Failed to fetch shipments:', err)
      setError('Unable to load shipments. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (data) => {
    const delivered = data.filter(
      (item) => item.status === 'Delivered'
    )

    const pending = data.filter(
      (item) => item.status !== 'Delivered'
    )

    const revenue = delivered.reduce(
      (total, item) => total + (Number(item.revenue) || 0),
      0
    )

    setStats({
      totalShipments: data.length,
      deliveredShipments: delivered.length,
      pendingShipments: pending.length,
      totalRevenue: revenue,
    })
  }

  const updateStatus = async (id, status) => {
    const previousShipments = shipments

    try {
      setUpdatingId(id)
      setError('')

      // Update the UI immediately for a responsive experience.
      const updated = shipments.map((shipment) =>
        shipment._id === id
          ? { ...shipment, status }
          : shipment
      )

      setShipments(updated)
      calculateStats(updated)

      await api.put(`/shipments/${id}`, { status })
    } catch (err) {
      console.error('Failed to update shipment:', err)

      // Restore the previous data if the API request fails.
      setShipments(previousShipments)
      calculateStats(previousShipments)
      setError('Status update failed. Please try again.')
    } finally {
      setUpdatingId(null)
    }
  }

  useEffect(() => {
    fetchShipments()
  }, [])

  // Main page entrance animation.
  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      tl.fromTo(
        '.shipment-header',
        {
          opacity: 0,
          y: -35,
          scale: 0.97,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
        }
      )
        .fromTo(
          '.shipment-stat',
          {
            opacity: 0,
            y: 35,
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.13,
          },
          '-=0.35'
        )
        .fromTo(
          '.shipment-toolbar',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.15'
        )
        .fromTo(
          '.shipment-card',
          {
            opacity: 0,
            y: 30,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.09,
          },
          '-=0.1'
        )

      gsap.to('.header-glow', {
        x: 70,
        y: 25,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    },
    { scope: container }
  )

  // Animate cards when the displayed shipment list changes.
  useGSAP(
    () => {
      const cards = gsap.utils.toArray('.shipment-card')

      if (!cards.length) return

      gsap.fromTo(
        cards,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.055,
          ease: 'power2.out',
          clearProps: 'transform',
        }
      )

      cards.forEach((card) => {
        const enter = () => {
          gsap.to(card, {
            y: -6,
            scale: 1.012,
            borderColor: 'rgba(129, 140, 248, 0.45)',
            boxShadow: '0 18px 40px rgba(0, 0, 0, 0.2)',
            duration: 0.25,
            ease: 'power2.out',
          })
        }

        const leave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
            duration: 0.3,
            ease: 'power2.out',
          })
        }

        card.addEventListener('mouseenter', enter)
        card.addEventListener('mouseleave', leave)

        // Keep native event listeners scoped to this GSAP context.
        const cleanup = () => {
          card.removeEventListener('mouseenter', enter)
          card.removeEventListener('mouseleave', leave)
        }

        gsap.context(() => {}).add(cleanup)
      })
    },
    {
      scope: container,
      dependencies: [search, statusFilter, loading],
    }
  )

  const filteredShipments = shipments.filter((shipment) => {
    const query = search.trim().toLowerCase()

    const matchesSearch =
      (shipment.crop || '').toLowerCase().includes(query) ||
      (shipment.farmerName || '').toLowerCase().includes(query) ||
      (shipment.destination || '').toLowerCase().includes(query)

    const matchesStatus =
      statusFilter === 'All' || shipment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const statCards = [
    {
      title: 'Total Shipments',
      value: stats.totalShipments,
      icon: Package,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/15',
      glow: 'bg-indigo-500/10',
      description: 'All shipment records',
    },
    {
      title: 'Delivered',
      value: stats.deliveredShipments,
      icon: CheckCircle,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/15',
      glow: 'bg-emerald-500/10',
      description: 'Successfully delivered',
    },
    {
      title: 'Pending',
      value: stats.pendingShipments,
      icon: Clock3,
      color: 'text-amber-400',
      bg: 'bg-amber-500/15',
      glow: 'bg-amber-500/10',
      description: 'Awaiting completion',
    },
    {
      title: 'Delivered Revenue',
      value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`,
      icon: BadgeIndianRupee,
      color: 'text-purple-400',
      bg: 'bg-purple-500/15',
      glow: 'bg-purple-500/10',
      description: 'Revenue from delivered shipments',
      isCurrency: true,
    },
  ]

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered':
        return 'border-emerald-400/25 bg-emerald-500/10 text-emerald-300'

      case 'In Transit':
        return 'border-amber-400/25 bg-amber-500/10 text-amber-300'

      default:
        return 'border-rose-400/25 bg-rose-500/10 text-rose-300'
    }
  }

  return (
    <MainLayout>
      <div
        ref={container}
        className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4 text-white md:p-7"
      >
        {/* HEADER */}
        <div className="shipment-header relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur-xl md:p-9">
          <div className="header-glow pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-[90px]" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                <Sprout size={14} />
                AgriLink Logistics
              </div>

              <h1 className="text-3xl font-black tracking-tight md:text-4xl">
                Shipment Management
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
                Manage crop logistics, monitor delivery progress and
                update shipment statuses from one dashboard.
              </p>
            </div>

            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="hidden h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] shadow-xl md:flex"
            >
              <Truck size={43} className="text-indigo-400" />
            </motion.div>
          </div>

          <div className="relative mt-6 flex items-center gap-2 text-xs text-slate-400">
            <span
              className={`h-2 w-2 rounded-full ${
                loading ? 'animate-pulse bg-amber-400' : 'bg-emerald-400'
              }`}
            />
            {loading ? 'Syncing shipment records...' : 'Shipment records loaded'}
          </div>
        </div>

        {/* STATS */}
        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.title}
                className="shipment-stat relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-lg backdrop-blur-xl"
              >
                <div
                  className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full ${stat.glow} blur-2xl`}
                />

                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-400">
                      {stat.title}
                    </p>

                    <h2 className={`mt-4 text-3xl font-black ${stat.color}`}>
                      {loading
                        ? '—'
                        : typeof stat.value === 'number'
                          ? stat.value.toLocaleString('en-IN')
                          : stat.value}
                    </h2>
                  </div>

                  <div className={`rounded-2xl ${stat.bg} p-3.5`}>
                    <Icon size={24} className={stat.color} />
                  </div>
                </div>

                <p className="relative mt-5 border-t border-white/[0.07] pt-4 text-xs text-slate-500">
                  {stat.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* SHIPMENTS PANEL */}
        <div className="mt-7 rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl backdrop-blur-xl md:p-7">
          <div className="shipment-toolbar mb-6 flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
            <div>
              <h2 className="text-2xl font-bold">All Shipments</h2>
              <p className="mt-1 text-sm text-slate-400">
                Track shipments and manage delivery status.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 focus-within:border-indigo-400/50">
                <Search size={18} className="text-slate-500" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search crop, farmer..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500 sm:w-52"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none focus:border-indigo-400/50"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>

              <button
                onClick={fetchShipments}
                disabled={loading}
                title="Refresh shipments"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm transition hover:bg-white/10 disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={loading ? 'animate-spin' : ''}
                />
                Refresh
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-300">
              <span>{error}</span>
              <button
                onClick={fetchShipments}
                className="font-semibold underline underline-offset-4"
              >
                Retry
              </button>
            </div>
          )}

          <div className="mb-5 flex items-center justify-between gap-3 text-sm text-slate-400">
            <span>
              {loading ? 'Loading...' : `${filteredShipments.length} shipments found`}
            </span>

            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-indigo-400" />
              Status management
            </span>
          </div>

          {/* LOADING SKELETONS */}
          {loading ? (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-3xl border border-white/10 bg-white/[0.035] p-6"
                >
                  <div className="mb-5 h-6 w-1/2 rounded bg-white/10" />
                  <div className="space-y-3">
                    <div className="h-4 w-3/4 rounded bg-white/[0.07]" />
                    <div className="h-4 w-2/3 rounded bg-white/[0.07]" />
                    <div className="h-4 w-1/2 rounded bg-white/[0.07]" />
                  </div>
                  <div className="mt-6 h-11 rounded-xl bg-white/[0.07]" />
                </div>
              ))}
            </div>
          ) : filteredShipments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center">
              <Package size={42} className="mx-auto mb-4 text-slate-600" />

              <h3 className="font-semibold text-slate-300">
                No shipments found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or status filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredShipments.map((shipment, index) => (
                  <motion.div
                    layout
                    key={shipment._id}
                    initial={{ opacity: 0, y: 22, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(index * 0.045, 0.25),
                    }}
                    className="shipment-card relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/35 p-5 md:p-6"
                  >
                    {/* CARD TOP */}
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-3">
                          <Truck size={24} className="text-indigo-400" />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold">
                            {shipment.crop || 'Unnamed Crop'}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            Shipment #{String(shipment._id || '').slice(-6).toUpperCase()}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(shipment.status)}`}
                      >
                        {shipment.status || 'Pending'}
                      </span>
                    </div>

                    {/* DETAILS */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                        <p className="text-xs text-slate-500">Farmer</p>
                        <p className="mt-2 truncate text-sm font-semibold text-slate-200">
                          {shipment.farmerName || 'Not provided'}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                        <p className="text-xs text-slate-500">Quantity</p>
                        <p className="mt-2 text-sm font-semibold text-slate-200">
                          {Number(shipment.quantity || 0).toLocaleString('en-IN')} KG
                        </p>
                      </div>

                      <div className="col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <MapPin size={14} />
                          Destination
                        </div>

                        <p className="mt-2 text-sm font-medium text-slate-200">
                          {shipment.destination || 'Not provided'}
                        </p>
                      </div>
                    </div>

                    {/* REVENUE */}
                    <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-emerald-400/15 bg-emerald-500/[0.06] p-4">
                      <div>
                        <p className="text-xs text-slate-400">Price per KG</p>
                        <p className="mt-1 font-semibold text-slate-200">
                          ₹{Number(shipment.pricePerKg || 0).toLocaleString('en-IN')}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-slate-400">Shipment Revenue</p>
                        <p className="mt-1 text-lg font-black text-emerald-400">
                          ₹{Number(shipment.revenue || 0).toLocaleString('en-IN')}
                        </p>
                      </div>

                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-emerald-500"
                      />
                    </div>

                    {/* STATUS UPDATE */}
                    <div className="mt-5">
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Update delivery status
                      </label>

                      <div className="relative">
                        <select
                          value={shipment.status || 'Pending'}
                          disabled={updatingId === shipment._id}
                          onChange={(e) =>
                            updateStatus(shipment._id, e.target.value)
                          }
                          className="w-full appearance-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3.5 pr-10 text-sm font-medium text-white outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10 disabled:cursor-wait disabled:opacity-50"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Delivered">Delivered</option>
                        </select>

                        {updatingId === shipment._id && (
                          <RefreshCw
                            size={16}
                            className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-indigo-400"
                          />
                        )}
                      </div>

                      <p className="mt-2 text-xs text-slate-500">
                        {updatingId === shipment._id
                          ? 'Saving status...'
                          : 'Changes are saved to the server.'}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 px-1 text-xs text-slate-500">
          <span>AgriLink · Shipment Operations</span>
          <span>{stats.deliveredShipments} of {stats.totalShipments} shipments delivered</span>
        </div>
      </div>
    </MainLayout>
  )
}

export default AdminShipments
