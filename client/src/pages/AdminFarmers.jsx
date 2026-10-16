
import { useEffect, useState, useRef } from 'react'
import MainLayout from '../layouts/MainLayout'
import api from '../services/api'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import {
  Users,
  Search,
  UserCheck,
  CalendarDays,
  RefreshCw,
  Sprout,
  Mail,
  ShieldCheck,
} from 'lucide-react'

gsap.registerPlugin(useGSAP)

const AdminFarmers = () => {
  const container = useRef(null)

  const [farmers, setFarmers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  const fetchFarmers = async () => {
    try {
      setLoading(true)
      setError('')

      const res = await api.get('/admin/farmers')
      setFarmers(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error(err)
      setError('Unable to load farmers. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFarmers()
  }, [])

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      timeline
        .fromTo(
          '.farmers-header',
          { opacity: 0, y: -35 },
          { opacity: 1, y: 0, duration: 0.7 }
        )
        .fromTo(
          '.farmer-stat',
          { opacity: 0, y: 35, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.13,
          },
          '-=0.3'
        )
        .fromTo(
          '.farmers-table',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.15'
        )

      gsap.to('.header-glow', {
        x: 100,
        y: 25,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.utils.toArray('.farmer-stat').forEach((card) => {
        const enter = () => {
          gsap.to(card, {
            y: -6,
            scale: 1.02,
            duration: 0.22,
            ease: 'power2.out',
          })
        }

        const leave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.25,
            ease: 'power2.out',
          })
        }

        card.addEventListener('mouseenter', enter)
        card.addEventListener('mouseleave', leave)

        // Clean up listeners when the component is reverted.
        const cleanup = () => {
          card.removeEventListener('mouseenter', enter)
          card.removeEventListener('mouseleave', leave)
        }

        gsap.context(() => {}).add(cleanup)
      })
    },
    { scope: container }
  )

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const registeredThisMonth = farmers.filter((farmer) => {
    if (!farmer.createdAt) return false

    const date = new Date(farmer.createdAt)

    return (
      !Number.isNaN(date.getTime()) &&
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    )
  }).length

  const filteredFarmers = farmers.filter((farmer) => {
    const query = search.toLowerCase().trim()

    return (
      (farmer.name || '').toLowerCase().includes(query) ||
      (farmer.email || '').toLowerCase().includes(query) ||
      (farmer.role || '').toLowerCase().includes(query)
    )
  })

  const stats = [
    {
      title: 'Total Farmers',
      value: farmers.length,
      description: 'All registered accounts',
      icon: Users,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/15',
      glow: 'from-indigo-500/20',
    },
    {
      title: 'Active Users',
      value: farmers.length,
      description: 'Accounts returned by API',
      icon: UserCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/15',
      glow: 'from-emerald-500/20',
    },
    {
      title: 'Joined This Month',
      value: registeredThisMonth,
      description: 'New registrations this month',
      icon: CalendarDays,
      color: 'text-purple-400',
      bg: 'bg-purple-500/15',
      glow: 'from-purple-500/20',
    },
  ]

  return (
    <MainLayout>
      <div
        ref={container}
        className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4 text-white md:p-7"
      >
        {/* HEADER */}
        <div className="farmers-header relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl md:p-9">
          <div className="header-glow pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-[90px]" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ y: [0, -5, 0], rotate: [0, 3, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="rounded-2xl border border-indigo-400/30 bg-indigo-500/15 p-4 shadow-lg shadow-indigo-950/40"
              >
                <Sprout size={34} className="text-indigo-400" />
              </motion.div>

              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  AgriLink Administration
                </div>

                <h1 className="text-3xl font-black tracking-tight md:text-4xl">
                  Farmers Management
                </h1>

                <p className="mt-2 text-sm text-slate-400 md:text-base">
                  Manage farmer accounts and monitor registrations.
                </p>
              </div>
            </div>

            <button
              onClick={fetchFarmers}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold transition duration-300 hover:border-indigo-400/40 hover:bg-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50 md:self-center"
            >
              <RefreshCw
                size={17}
                className={loading ? 'animate-spin' : ''}
              />
              Refresh Data
            </button>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.title}
                className="farmer-stat relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-xl backdrop-blur-xl"
              >
                <div
                  className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${stat.glow} to-transparent blur-2xl`}
                />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400">
                      {stat.title}
                    </p>

                    <h2 className={`mt-4 text-4xl font-black ${stat.color}`}>
                      {loading ? '—' : stat.value.toLocaleString('en-IN')}
                    </h2>

                    <p className="mt-3 text-xs text-slate-500">
                      {stat.description}
                    </p>
                  </div>

                  <div className={`rounded-2xl ${stat.bg} p-3.5`}>
                    <Icon size={25} className={stat.color} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* TABLE */}
        <div className="farmers-table mt-7 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col justify-between gap-5 border-b border-white/10 p-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold md:text-2xl">
                Registered Farmers
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Search and review farmer account details.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 transition focus-within:border-indigo-400/60">
                <Search size={18} className="shrink-0 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search farmers..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500 sm:w-56"
                />
              </div>

              <div className="flex items-center justify-center gap-2 rounded-xl border border-indigo-400/20 bg-indigo-500/10 px-4 py-3 text-sm font-semibold text-indigo-300">
                <Users size={17} />
                {filteredFarmers.length} results
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="bg-slate-950/50 text-xs uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-5 font-semibold">Farmer</th>
                  <th className="px-6 py-5 font-semibold">Email Address</th>
                  <th className="px-6 py-5 font-semibold">Role</th>
                  <th className="px-6 py-5 font-semibold">Joined Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.06]">
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      {Array.from({ length: 4 }).map((__, cell) => (
                        <td key={cell} className="px-6 py-5">
                          <div className="h-5 animate-pulse rounded-lg bg-white/10" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : error ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-14 text-center text-rose-300"
                    >
                      <p>{error}</p>
                      <button
                        onClick={fetchFarmers}
                        className="mt-3 rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
                      >
                        Try again
                      </button>
                    </td>
                  </tr>
                ) : filteredFarmers.length > 0 ? (
                  filteredFarmers.map((farmer, index) => (
                    <motion.tr
                      key={farmer._id || farmer.id || farmer.email || index}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: Math.min(index * 0.04, 0.28),
                      }}
                      className="group transition-colors duration-200 hover:bg-white/[0.045]"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/30 to-purple-500/20 font-bold text-indigo-200 transition duration-300 group-hover:scale-105">
                            {(farmer.name || 'F')
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-100">
                              {farmer.name || 'Unnamed Farmer'}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Farmer account
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <Mail size={15} className="shrink-0 text-slate-500" />
                          {farmer.email || 'Not provided'}
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold capitalize text-indigo-300">
                          <ShieldCheck size={14} />
                          {farmer.role || 'Farmer'}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-400">
                        {farmer.createdAt &&
                        !Number.isNaN(new Date(farmer.createdAt).getTime())
                          ? new Date(farmer.createdAt).toLocaleDateString(
                              'en-IN',
                              {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              }
                            )
                          : '—'}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <Search
                        size={38}
                        className="mx-auto mb-4 text-slate-600"
                      />

                      <p className="font-semibold text-slate-300">
                        No farmers found
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        {search
                          ? 'Try another name, email or role.'
                          : 'Farmer registrations will appear here.'}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-white/10 px-6 py-4 text-xs text-slate-500">
            Showing {filteredFarmers.length} of {farmers.length} farmer accounts
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default AdminFarmers
