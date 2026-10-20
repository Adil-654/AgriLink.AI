
import { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'

import {
  BarChart3,
  Truck,
  BadgeIndianRupee,
  Users,
  CheckCircle2,
  Clock3,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Leaf,
  Package,
  Activity,
  CalendarDays,
  Sprout,
  CircleDollarSign,
  MapPin,
  Sparkles,
} from 'lucide-react'

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from 'recharts'

import { motion } from 'framer-motion'

const shipmentData = [
  { month: 'Jan', shipments: 40, revenue: 32 },
  { month: 'Feb', shipments: 65, revenue: 48 },
  { month: 'Mar', shipments: 55, revenue: 42 },
  { month: 'Apr', shipments: 90, revenue: 68 },
  { month: 'May', shipments: 75, revenue: 60 },
  { month: 'Jun', shipments: 120, revenue: 92 },
  { month: 'Jul', shipments: 105, revenue: 85 },
  { month: 'Aug', shipments: 145, revenue: 110 },
  { month: 'Sep', shipments: 125, revenue: 96 },
  { month: 'Oct', shipments: 170, revenue: 135 },
  { month: 'Nov', shipments: 155, revenue: 122 },
  { month: 'Dec', shipments: 195, revenue: 160 },
]

const deliveryData = [
  { name: 'Delivered', value: 70, color: '#16a34a' },
  { name: 'Pending', value: 20, color: '#f59e0b' },
  { name: 'In Transit', value: 10, color: '#3b82f6' },
]

const recentShipments = [
  {
    id: 'AG-2048',
    crop: 'Wheat',
    destination: 'Indore, MP',
    status: 'Delivered',
    amount: '₹24,500',
    icon: '🌾',
    progress: 100,
  },
  {
    id: 'AG-2049',
    crop: 'Rice',
    destination: 'Bhopal, MP',
    status: 'In Transit',
    amount: '₹18,200',
    icon: '🌾',
    progress: 68,
  },
  {
    id: 'AG-2050',
    crop: 'Soybean',
    destination: 'Dewas, MP',
    status: 'Pending',
    amount: '₹32,800',
    icon: '🌱',
    progress: 25,
  },
  {
    id: 'AG-2051',
    crop: 'Maize',
    destination: 'Ujjain, MP',
    status: 'Delivered',
    amount: '₹15,600',
    icon: '🌽',
    progress: 100,
  },
]

const stats = [
  {
    title: 'Total Shipments',
    value: 320,
    suffix: '',
    change: '+12.8%',
    positive: true,
    icon: Truck,
    color: 'emerald',
    description: 'vs. last month',
  },
  {
    title: 'Delivered Orders',
    value: 240,
    suffix: '',
    change: '+8.2%',
    positive: true,
    icon: CheckCircle2,
    color: 'blue',
    description: 'vs. last month',
  },
  {
    title: 'Pending Orders',
    value: 52,
    suffix: '',
    change: '-4.3%',
    positive: true,
    icon: Clock3,
    color: 'amber',
    description: 'vs. last month',
  },
  {
    title: 'Active Farmers',
    value: 148,
    suffix: '',
    change: '+18.6%',
    positive: true,
    icon: Users,
    color: 'violet',
    description: 'vs. last month',
  },
  {
    title: 'Total Revenue',
    value: 82,
    suffix: 'K',
    prefix: '₹',
    change: '+15.4%',
    positive: true,
    icon: CircleDollarSign,
    color: 'rose',
    description: 'vs. last month',
  },
]

const colorStyles = {
  emerald: {
    icon: 'bg-emerald-50 text-emerald-600',
    glow: 'group-hover:shadow-emerald-100',
    line: '#10b981',
  },
  blue: {
    icon: 'bg-blue-50 text-blue-600',
    glow: 'group-hover:shadow-blue-100',
    line: '#3b82f6',
  },
  amber: {
    icon: 'bg-amber-50 text-amber-600',
    glow: 'group-hover:shadow-amber-100',
    line: '#f59e0b',
  },
  violet: {
    icon: 'bg-violet-50 text-violet-600',
    glow: 'group-hover:shadow-violet-100',
    line: '#8b5cf6',
  },
  rose: {
    icon: 'bg-rose-50 text-rose-600',
    glow: 'group-hover:shadow-rose-100',
    line: '#f43f5e',
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
}

function AnimatedCounter({ value, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let frame
    let startTime

    const duration = 1200

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp

      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)

      setCount(Math.round(value * eased))

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frame)
  }, [value])

  return (
    <>
      {prefix}
      {count}
      {suffix}
    </>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-xl">
      <p className="mb-2 text-sm font-semibold text-gray-500">{label}</p>

      {payload.map((item) => (
        <p key={item.dataKey} className="text-sm font-bold text-gray-800">
          <span
            className="mr-2 inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          {item.name}: {item.dataKey === 'revenue' ? `₹${item.value}K` : item.value}
        </p>
      ))}
    </div>
  )
}

const Analytics = () => {
  return (
    <MainLayout>
      <div className="relative min-h-screen overflow-hidden bg-[#f6f9f6] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 top-[520px] h-72 w-72 rounded-full bg-lime-200/20 blur-3xl" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-[1600px] space-y-7"
        >
          {/* HERO */}
          <motion.section
            variants={itemVariants}
            className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-[#064e3b] via-[#087443] to-[#16a34a] p-6 text-white shadow-2xl shadow-emerald-900/15 sm:p-9 lg:p-10"
          >
            <div className="pointer-events-none absolute -right-10 -top-24 h-80 w-80 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -right-1 top-0 h-64 w-64 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute bottom-[-90px] right-[24%] h-56 w-56 rounded-full bg-lime-300/10 blur-2xl" />

            <motion.div
              animate={{ y: [0, -9, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-8 top-8 hidden rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md md:block lg:right-14 lg:top-12"
            >
              <Sprout size={54} strokeWidth={1.4} />
            </motion.div>

            <div className="relative z-10 max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-emerald-50 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-300" />
                </span>
                AGRILINK AI · BUSINESS OVERVIEW
              </div>

              <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Grow smarter.
                <br />
                <span className="bg-gradient-to-r from-lime-200 to-emerald-100 bg-clip-text text-transparent">
                  Deliver better.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-emerald-50/85 sm:text-base">
                Your agriculture operations, supply chain performance, and business
                insights — all in one place.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm backdrop-blur-md">
                  <CalendarDays size={17} />
                  <span>Annual overview</span>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-emerald-800 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
                  <Activity size={17} />
                  Operations summary
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-9 grid grid-cols-2 gap-3 border-t border-white/15 pt-6 sm:max-w-xl sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium text-emerald-100/75">Delivery rate</p>
                <p className="mt-1 text-2xl font-extrabold">75%</p>
              </div>
              <div>
                <p className="text-xs font-medium text-emerald-100/75">Active network</p>
                <p className="mt-1 text-2xl font-extrabold">148 farmers</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-xs font-medium text-emerald-100/75">Business growth</p>
                <p className="mt-1 flex items-center gap-1.5 text-2xl font-extrabold">
                  <TrendingUp size={21} />
                  +15.4%
                </p>
              </div>
            </div>
          </motion.section>

          {/* SECTION TITLE */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-end justify-between gap-3"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                Performance snapshot
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
                Your business at a glance
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                A quick look at your key operational metrics.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-white px-3 py-2 text-xs font-semibold text-gray-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Sample dashboard data
            </div>
          </motion.div>

          {/* STAT CARDS */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              const style = colorStyles[stat.color]

              return (
                <motion.div
                  key={stat.title}
                  variants={itemVariants}
                  whileHover={{ y: -7, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                  className={`group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-xl ${style.glow}`}
                >
                  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gray-50 transition-transform duration-500 group-hover:scale-150" />

                  <div className="relative flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <h3 className="mt-4 text-3xl font-black tracking-tight text-gray-900">
                        <AnimatedCounter
                          value={stat.value}
                          prefix={stat.prefix || ''}
                          suffix={stat.suffix || ''}
                        />
                      </h3>
                    </div>

                    <div className={`rounded-2xl p-3 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 ${style.icon}`}>
                      <Icon size={22} strokeWidth={2} />
                    </div>
                  </div>

                  <div className="relative mt-5 flex flex-wrap items-center gap-1.5">
                    {stat.positive ? (
                      <TrendingUp size={14} className="text-emerald-600" />
                    ) : (
                      <TrendingDown size={14} className="text-rose-600" />
                    )}

                    <span className={`text-xs font-bold ${stat.positive ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-400">{stat.description}</span>
                  </div>

                  <div className="relative mt-4 h-1 overflow-hidden rounded-full bg-gray-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${52 + index * 10}%` }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: style.line }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Shipment chart */}
            <motion.section
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7 xl:col-span-2"
            >
              <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-700">
                      <BarChart3 size={21} />
                    </div>
                    <h2 className="text-lg font-extrabold text-gray-900 sm:text-xl">
                      Shipment performance
                    </h2>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Track shipment volume throughout the year.
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
                  Jan — Dec
                </div>
              </div>

              <div className="mb-5 flex flex-wrap gap-5">
                <div>
                  <p className="text-xs text-gray-500">Total shipments</p>
                  <p className="mt-1 text-2xl font-black text-gray-900">1,280</p>
                </div>
                <div className="border-l border-gray-100 pl-5">
                  <p className="text-xs text-gray-500">Average / month</p>
                  <p className="mt-1 text-2xl font-black text-gray-900">107</p>
                </div>
              </div>

              <div className="h-[280px] w-full sm:h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={shipmentData} margin={{ top: 10, right: 4, left: -18, bottom: 0 }}>
                    <defs>
                      <linearGradient id="shipmentGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.28} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.01} />
                      </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#eef2ef" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="shipments"
                      name="Shipments"
                      stroke="#059669"
                      strokeWidth={3}
                      fill="url(#shipmentGradient)"
                      activeDot={{ r: 6, strokeWidth: 3, stroke: '#d1fae5' }}
                      animationDuration={1400}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.section>

            {/* Delivery status */}
            <motion.section
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                  <Package size={21} />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-gray-900">Delivery status</h2>
                  <p className="mt-1 text-sm text-gray-500">Order distribution</p>
                </div>
              </div>

              <div className="relative mx-auto mt-3 h-[240px] max-w-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deliveryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={69}
                      outerRadius={98}
                      paddingAngle={5}
                      stroke="none"
                      cornerRadius={6}
                      animationDuration={1200}
                    >
                      {deliveryData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Orders']} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-gray-900">75%</span>
                  <span className="mt-1 text-xs font-medium text-gray-500">Delivery rate</span>
                </div>
              </div>

              <div className="mt-2 space-y-4">
                {deliveryData.map((item) => (
                  <div key={item.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm font-medium text-gray-600">{item.name}</span>
                      </div>
                      <span className="text-sm font-extrabold text-gray-900">{item.value}%</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* REVENUE CHART + INSIGHT */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <motion.section
              variants={itemVariants}
              className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7 xl:col-span-2"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600">
                      <BadgeIndianRupee size={21} />
                    </div>
                    <h2 className="text-lg font-extrabold text-gray-900 sm:text-xl">
                      Revenue overview
                    </h2>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Illustrative monthly revenue in thousands of rupees.
                  </p>
                </div>

                <span className="hidden rounded-xl bg-violet-50 px-3 py-2 text-xs font-bold text-violet-700 sm:inline-flex">
                  INR ₹
                </span>
              </div>

              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={shipmentData} margin={{ top: 8, right: 4, left: -18, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#eef2ef" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                      dy={8}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                      tickFormatter={(value) => `₹${value}K`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="revenue"
                      name="Revenue"
                      fill="#8b5cf6"
                      radius={[7, 7, 0, 0]}
                      maxBarSize={30}
                      animationDuration={1200}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.section>

            {/* Insight card */}
            <motion.section
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#102e24] via-[#164e36] to-[#166534] p-6 text-white shadow-xl shadow-emerald-900/10 sm:p-7"
            >
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border border-white/10" />
              <div className="absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-emerald-400/10 blur-2xl" />

              <div className="relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-lime-200">
                  <Sparkles size={24} />
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">
                  Business highlights
                </p>

                <h2 className="mt-2 text-2xl font-black leading-tight">
                  Keep your
                  <br />
                  business growing.
                </h2>

                <p className="mt-3 text-sm leading-6 text-emerald-50/80">
                  Use these operational indicators to identify delivery bottlenecks
                  and track business performance.
                </p>

                <div className="mt-7 space-y-4">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5">
                    <div className="rounded-xl bg-emerald-400/15 p-2 text-lime-200">
                      <TrendingUp size={19} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Shipment activity</p>
                      <p className="mt-1 text-xs text-emerald-100/65">
                        Review monthly shipment trends
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5">
                    <div className="rounded-xl bg-amber-400/15 p-2 text-amber-200">
                      <Clock3 size={19} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Pending deliveries</p>
                      <p className="mt-1 text-xs text-emerald-100/65">
                        Monitor orders awaiting dispatch
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5">
                    <div className="rounded-xl bg-blue-400/15 p-2 text-blue-200">
                      <MapPin size={19} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Supply chain</p>
                      <p className="mt-1 text-xs text-emerald-100/65">
                        Track destination and delivery status
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-5 text-xs text-emerald-100/70">
                  <Leaf size={15} />
                  Better insights. Smarter agriculture.
                </div>
              </div>
            </motion.section>
          </div>

          {/* RECENT SHIPMENTS */}
          <motion.section
            variants={itemVariants}
            className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5 sm:p-7">
              <div>
                <div className="flex items-center gap-2">
                  <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-700">
                    <Truck size={21} />
                  </div>
                  <h2 className="text-lg font-extrabold text-gray-900 sm:text-xl">
                    Recent shipments
                  </h2>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  A snapshot of recent supply chain activity.
                </p>
              </div>

              <span className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-500">
                Sample records
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {recentShipments.map((shipment, index) => (
                <motion.div
                  key={shipment.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07, duration: 0.4 }}
                  className="grid grid-cols-1 items-center gap-4 px-5 py-5 transition-colors hover:bg-emerald-50/40 sm:grid-cols-[1.5fr_1.3fr_1fr_1fr] sm:px-7"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
                      {shipment.icon}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{shipment.crop}</p>
                      <p className="mt-1 text-xs text-gray-400">{shipment.id}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 sm:hidden">Destination</p>
                    <p className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                      <MapPin size={14} className="text-gray-400" />
                      {shipment.destination}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                        shipment.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700'
                          : shipment.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {shipment.status}
                    </span>
                    <div className="mt-2 h-1.5 max-w-32 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full ${
                          shipment.status === 'Delivered'
                            ? 'bg-emerald-500'
                            : shipment.status === 'Pending'
                              ? 'bg-amber-400'
                              : 'bg-blue-500'
                        }`}
                        style={{ width: `${shipment.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-xs text-gray-400">Shipment value</p>
                    <p className="mt-1 text-base font-extrabold text-gray-900">
                      {shipment.amount}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* FOOTER */}
          <motion.footer
            variants={itemVariants}
            className="flex flex-col items-center justify-between gap-2 pb-3 text-center text-xs text-gray-400 sm:flex-row sm:text-left"
          >
            <p className="flex items-center gap-2">
              <Sprout size={15} className="text-emerald-600" />
              AgriLink AI · Agriculture intelligence platform
            </p>
            <p>Analytics preview · Figures shown are illustrative</p>
          </motion.footer>
        </motion.div>
      </div>
    </MainLayout>
  )
}

export default Analytics
