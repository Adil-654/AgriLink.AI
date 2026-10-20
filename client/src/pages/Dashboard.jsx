
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Truck,
  BadgeIndianRupee,
  CheckCircle,
  Clock3,
  Sprout,
  Droplets,
  Leaf,
  Sparkles,
  TrendingUp,
  RefreshCw,
  AlertCircle,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";
import StatsCard from "../components/StatsCard";
import YieldChart from "../components/YieldChart";
import api from "../services/api";

gsap.registerPlugin(ScrollTrigger);

const INITIAL_STATS = {
  totalShipments: 0,
  deliveredShipments: 0,
  pendingShipments: 0,
  totalRevenue: 0,
};

const sustainabilityCards = [
  {
    title: "Sustainability Score",
    value: "92%",
    description: "Excellent eco farming",
    icon: Leaf,
    style: "from-emerald-500 to-green-700",
  },
  {
    title: "Water Saved",
    value: "12,450 L",
    description: "Smart irrigation",
    icon: Droplets,
    style: "from-sky-500 to-cyan-700",
  },
  {
    title: "Carbon Reduced",
    value: "285 kg",
    description: "CO₂ emission savings",
    icon: Sprout,
    style: "from-lime-500 to-emerald-700",
  },
  {
    title: "AI Recommendation",
    value: "Soybean",
    description: "Crop suggestion",
    icon: Sparkles,
    style: "from-violet-600 to-indigo-800",
  },
];

const formatCurrency = (value) => {
  const amount = Number(value);

  if (value == null || value === "" || !Number.isFinite(amount)) {
    return "₹0";
  }

  return `₹${amount.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
};

const Dashboard = () => {
  const rootRef = useRef(null);

  const [stats, setStats] = useState(INITIAL_STATS);
  const [prices, setPrices] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [pricesLoading, setPricesLoading] = useState(true);
  const [statsError, setStatsError] = useState("");
  const [pricesError, setPricesError] = useState("");

  const fetchPrices = async () => {
    setPricesLoading(true);
    setPricesError("");

    try {
      const res = await api.get("/market/prices");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.prices;

      if (!Array.isArray(data)) {
        throw new Error("Unexpected market prices response.");
      }

      setPrices(data);
    } catch (err) {
      console.error("Failed to fetch market prices:", err);
      setPricesError("Unable to load market prices. Please try again.");
    } finally {
      setPricesLoading(false);
    }
  };

  const fetchFarmerStats = async () => {
    setStatsLoading(true);
    setStatsError("");

    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        throw new Error("Please log in to view your farmer dashboard.");
      }

      const user = JSON.parse(storedUser);
      const userId = user?.id || user?._id;

      if (!userId) {
        throw new Error("Your user ID is missing. Please log in again.");
      }

      const res = await api.get(`/shipments/my-stats/${userId}`);

      const data = res.data?.stats || res.data;

      setStats({
        ...INITIAL_STATS,
        ...data,
      });
    } catch (err) {
      console.error("Failed to fetch farmer statistics:", err);
      setStatsError(
        err.message || "Unable to load shipment statistics."
      );
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmerStats();
    fetchPrices();
  }, []);

  // GSAP entrance animations and scroll reveals.
  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      intro
        .fromTo(
          ".dashboard-hero",
          { autoAlpha: 0, y: 35 },
          { autoAlpha: 1, y: 0, duration: 0.8 }
        )
        .fromTo(
          ".hero-badge",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.4 },
          "-=0.45"
        )
        .fromTo(
          ".hero-message",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.55 },
          "-=0.3"
        );

      gsap.fromTo(
        ".stat-card",
        { autoAlpha: 0, y: 25 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.12,
          ease: "power2.out",
          delay: 0.3,
        }
      );

      gsap.utils.toArray(".reveal-section").forEach((section) => {
        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      gsap.fromTo(
        ".eco-card",
        { autoAlpha: 0, y: 24, scale: 0.97 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".eco-grid",
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.to(".hero-glow", {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <MainLayout>
      <main
        ref={rootRef}
        className="min-h-screen overflow-hidden bg-[#f5f8f5] text-slate-800"
      >
        <div className="mx-auto max-w-[1600px] space-y-8 px-4 py-6 sm:px-6 lg:px-10 lg:py-9">

          {/* HERO */}
          <section className="dashboard-hero relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#052e24] via-[#087451] to-[#10a578] p-6 text-white shadow-2xl shadow-emerald-900/10 sm:p-9 lg:p-12">
            <div className="hero-glow pointer-events-none absolute -right-16 -top-24 -z-10 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 left-1/3 -z-10 h-72 w-72 rounded-full bg-teal-300/10 blur-3xl" />

            <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_0.6fr]">
              <div>
                <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-emerald-100 backdrop-blur">
                  <Sprout size={15} />
                  AgriLink AI · Farmer Portal
                </div>

                <h1 className="mt-6 text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  Grow smarter.
                  <br />
                  <span className="bg-gradient-to-r from-lime-200 to-emerald-100 bg-clip-text text-transparent">
                    Harvest better.
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-7 text-emerald-50/85 sm:text-base">
                  Your farming operations, shipment performance, and market
                  insights — together in one intelligent dashboard.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold backdrop-blur">
                    <ShieldCheck size={18} className="text-lime-200" />
                    Smart farming overview
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold backdrop-blur">
                    <TrendingUp size={18} className="text-lime-200" />
                    Market intelligence
                  </div>
                </div>
              </div>

              <div className="hidden justify-center lg:flex">
                <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-white/15 bg-white/[0.06]">
                  <div className="absolute inset-5 rounded-full border border-dashed border-white/25" />
                  <div className="absolute inset-10 rounded-full border border-white/15" />

                  <div className="flex h-36 w-36 items-center justify-center rounded-[2rem] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
                    <Sprout size={78} strokeWidth={1.25} className="text-lime-200" />
                  </div>

                  <div className="absolute right-0 top-10 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-xl">
                    <Droplets className="text-cyan-200" size={24} />
                  </div>

                  <div className="absolute bottom-5 left-0 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-xl">
                    <TrendingUp className="text-lime-200" size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-message mt-9 flex flex-wrap items-center gap-3 rounded-2xl border border-white/15 bg-black/10 p-4 text-sm leading-6 text-emerald-50 backdrop-blur-sm">
              <Sparkles size={20} className="shrink-0 text-lime-200" />
              <span>
                Sustainable agriculture starts with better decisions. Monitor
                your shipments, compare market prices, and make informed
                farming choices.
              </span>
            </div>
          </section>

          {/* SHIPMENT STATISTICS */}
          <section>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                  Your performance
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                  Shipment Overview
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Track deliveries and earnings at a glance.
                </p>
              </div>

              <button
                onClick={fetchFarmerStats}
                disabled={statsLoading}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold shadow-sm transition hover:border-emerald-300 hover:text-emerald-700 disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={statsLoading ? "animate-spin" : ""}
                />
                Refresh
              </button>
            </div>

            {statsError && (
              <div
                role="alert"
                className="mb-4 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
              >
                <AlertCircle size={20} />
                <span>{statsError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: "My Shipments",
                  value: stats.totalShipments,
                  icon: <Truck className="text-emerald-700" size={23} />,
                  color: "bg-emerald-50",
                },
                {
                  title: "Delivered",
                  value: stats.deliveredShipments,
                  icon: <CheckCircle className="text-blue-700" size={23} />,
                  color: "bg-blue-50",
                },
                {
                  title: "Pending",
                  value: stats.pendingShipments,
                  icon: <Clock3 className="text-amber-700" size={23} />,
                  color: "bg-amber-50",
                },
                {
                  title: "Total Earnings",
                  value: formatCurrency(stats.totalRevenue),
                  icon: <BadgeIndianRupee className="text-violet-700" size={23} />,
                  color: "bg-violet-50",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="stat-card min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-500">
                      {item.title}
                    </p>
                    <div className={`rounded-xl p-3 ${item.color}`}>
                      {item.icon}
                    </div>
                  </div>

                  <p className="mt-6 break-words text-3xl font-black tracking-tight text-slate-900">
                    {statsLoading ? (
                      <span className="inline-block h-9 w-24 animate-pulse rounded-lg bg-slate-100" />
                    ) : (
                      item.value ?? 0
                    )}
                  </p>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SUSTAINABILITY */}
          <section className="reveal-section">
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                Planet-friendly farming
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                Sustainability at a glance
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Track environmental indicators alongside your operations.
              </p>
            </div>

            <div className="eco-grid grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {sustainabilityCards.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className={`eco-card group relative isolate overflow-hidden rounded-2xl bg-gradient-to-br ${item.style} p-6 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
                  >
                    <div className="pointer-events-none absolute -right-8 -top-8 -z-10 h-32 w-32 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-125" />

                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-white/80">
                          {item.title}
                        </p>
                        <h3 className="mt-4 text-3xl font-black tracking-tight">
                          {item.value}
                        </h3>
                      </div>

                      <div className="rounded-xl border border-white/20 bg-white/10 p-3">
                        <Icon size={25} />
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-white/80">
                      {item.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-xs font-bold text-white/90">
                      <Sparkles size={14} />
                      Sustainability insight
                    </div>
                  </article>
                );
              })}
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              Sustainability figures and crop suggestions are illustrative
              placeholders until connected to verified farmer data or your
              recommendation model.
            </p>
          </section>

          {/* ANALYTICS */}
          <section className="reveal-section grid grid-cols-1 gap-6 xl:grid-cols-[1.65fr_1fr]">
            <div className="min-w-0 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                  Performance analytics
                </p>
                <h2 className="mt-1 text-xl font-black sm:text-2xl">
                  Yield & Farming Trends
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Review the data visualized by your yield chart.
                </p>
              </div>

              <YieldChart />
            </div>

            <div className="min-w-0 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                  Quick insights
                </p>
                <h2 className="mt-1 text-xl font-black sm:text-2xl">
                  Your Activity
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: "Total Shipments",
                    value: stats.totalShipments,
                    icon: Truck,
                    color: "bg-emerald-50 text-emerald-700",
                  },
                  {
                    label: "Delivered",
                    value: stats.deliveredShipments,
                    icon: CheckCircle,
                    color: "bg-blue-50 text-blue-700",
                  },
                  {
                    label: "Pending",
                    value: stats.pendingShipments,
                    icon: Clock3,
                    color: "bg-amber-50 text-amber-700",
                  },
                  {
                    label: "Total Earnings",
                    value: formatCurrency(stats.totalRevenue),
                    icon: BadgeIndianRupee,
                    color: "bg-violet-50 text-violet-700",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/40"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className={`rounded-xl p-3 ${item.color}`}>
                          <Icon size={20} />
                        </div>
                        <span className="text-sm font-semibold text-slate-600">
                          {item.label}
                        </span>
                      </div>

                      <span className="break-words text-right text-lg font-black text-slate-900">
                        {statsLoading ? "..." : item.value ?? 0}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
                <div className="flex items-center gap-2 text-emerald-800">
                  <Leaf size={20} />
                  <p className="font-bold">Greener farming</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Monitor real shipment and yield data to make more informed
                  decisions about your farm.
                </p>
              </div>
            </div>
          </section>

          {/* MARKET PRICES */}
          <section className="reveal-section rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                  Market intelligence
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                  Current Market Prices
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Compare available crop prices before making a selling
                  decision.
                </p>
              </div>

              <button
                onClick={fetchPrices}
                disabled={pricesLoading}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold transition hover:border-emerald-300 hover:text-emerald-700 disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={pricesLoading ? "animate-spin" : ""}
                />
                Refresh prices
              </button>
            </div>

            {pricesError && (
              <div
                role="alert"
                className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle size={19} />
                  {pricesError}
                </div>

                <button
                  onClick={fetchPrices}
                  className="font-bold underline"
                >
                  Retry
                </button>
              </div>
            )}

            {pricesLoading ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse rounded-2xl border border-slate-100 p-5"
                  >
                    <div className="h-4 w-20 rounded bg-slate-200" />
                    <div className="mt-5 h-8 w-28 rounded bg-slate-200" />
                    <div className="mt-3 h-3 w-16 rounded bg-slate-100" />
                  </div>
                ))}
              </div>
            ) : prices.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
                {prices.map((item, index) => (
                  <article
                    key={item.crop || index}
                    className="group rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-white p-4 transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/5 sm:p-5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                        <Sprout size={21} />
                      </div>
                      <ArrowUpRight
                        size={17}
                        className="text-slate-400 transition group-hover:text-emerald-700"
                      />
                    </div>

                    <h3 className="mt-5 break-words text-base font-bold text-slate-800">
                      {item.crop || "Unknown crop"}
                    </h3>

                    <p className="mt-2 break-words text-xl font-black tracking-tight text-emerald-800 sm:text-2xl">
                      {formatCurrency(item.pricePerKg)}
                    </p>

                    <p className="mt-1 text-xs font-medium text-slate-500">
                      Per kg
                    </p>

                    <div className="mt-4 h-1 overflow-hidden rounded-full bg-emerald-100">
                      <div className="h-full w-2/3 rounded-full bg-emerald-500 transition-all duration-500 group-hover:w-full" />
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 px-5 py-12 text-center">
                <Sprout size={35} className="mx-auto text-emerald-600" />
                <h3 className="mt-4 font-bold text-slate-800">
                  No market prices available
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Your market API returned no crop prices.
                </p>
              </div>
            )}

            <p className="mt-5 text-xs leading-5 text-slate-500">
              Prices are displayed as returned by your backend. Confirm the
              source, market location, date, and unit before relying on them.
            </p>
          </section>

          {/* DAILY TIP */}
          <section className="reveal-section relative isolate overflow-hidden rounded-3xl bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#0f766e] p-6 text-white shadow-xl sm:p-9">
            <div className="pointer-events-none absolute -right-12 -top-16 -z-10 h-56 w-56 rounded-full bg-emerald-200/10 blur-3xl" />

            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                <Sprout size={30} className="text-lime-200" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">
                  Daily farming tip
                </p>

                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  Small changes. Healthier harvests.
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-emerald-50/90 sm:text-base">
                  Consider drip irrigation where suitable, maintain soil
                  organic matter, and monitor crop water requirements. These
                  practices can help manage water use and support soil health
                  when adapted to local conditions.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </MainLayout>
  );
};

export default Dashboard;
