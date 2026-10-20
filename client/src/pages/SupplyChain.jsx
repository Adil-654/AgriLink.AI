import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import {
  Truck,
  Package,
  RefreshCw,
  Sparkles,
  Leaf,
  MapPin,
  Clock3,
  CheckCircle2,
  AlertCircle,
  ArrowDown,
  Sprout,
  TrendingUp,
  ArrowUpRight,
  Boxes,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";
import ShipmentCard from "../components/ShipmentCard";
import CreateShipmentForm from "../components/CreateShipmentForm";
import api from "../services/api";

const AnimatedCounter = ({ value, loading }) => {
  const numberRef = useRef(null);

  useEffect(() => {
    if (loading || !numberRef.current) return;

    const counter = { value: 0 };

    const animation = gsap.to(counter, {
      value,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = Math.round(counter.value);
        }
      },
    });

    return () => animation.kill();
  }, [value, loading]);

  return <span ref={numberRef}>{loading ? "—" : value}</span>;
};

const SupplyChain = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const pageRef = useRef(null);
  const historyRef = useRef(null);

  const fetchShipments = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      let user;

      try {
        user = JSON.parse(localStorage.getItem("user") || "null");
      } catch {
        throw new Error(
          "Your session is invalid. Please log in again."
        );
      }

      if (!user?.name) {
        throw new Error(
          "Farmer information is missing. Please log in again."
        );
      }

      const response = await api.get(
        `/shipments/my/${encodeURIComponent(user.name)}`
      );

      const data = response.data;

      const records = Array.isArray(data)
        ? data
        : Array.isArray(data?.shipments)
          ? data.shipments
          : null;

      if (!records) {
        throw new Error(
          "Unexpected shipment data received from the server."
        );
      }

      setShipments(records);
    } catch (err) {
      console.error("Failed to fetch shipments:", err);

      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "Unable to load shipments. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline
        .from(".supply-hero", {
          y: 40,
          opacity: 0,
          duration: 0.85,
        })
        .from(
          ".supply-metric",
          {
            y: 28,
            opacity: 0,
            scale: 0.96,
            stagger: 0.1,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".supply-create-section",
          {
            y: 24,
            opacity: 0,
            duration: 0.65,
          },
          "-=0.2"
        )
        .from(
          ".supply-history-heading",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.2"
        );

      gsap.to(".supply-orb", {
        y: -18,
        x: 10,
        scale: 1.06,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      });

      gsap.to(".supply-hero-icon", {
        y: -8,
        rotation: 3,
        duration: 2.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (loading || shipments.length === 0 || !historyRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".supply-shipment-card",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.55,
          ease: "power3.out",
          clearProps: "transform",
        }
      );
    }, historyRef);

    return () => ctx.revert();
  }, [shipments, loading]);

  const totalShipments = shipments.length;

  const deliveredShipments = shipments.filter((shipment) =>
    /delivered|completed/i.test(shipment.status || "")
  ).length;

  const pendingShipments = shipments.filter((shipment) =>
    /pending|processing|in.?transit/i.test(shipment.status || "")
  ).length;

  const otherShipments = Math.max(
    0,
    totalShipments - deliveredShipments - pendingShipments
  );

  const metrics = [
    {
      label: "Total shipments",
      value: totalShipments,
      description: "All your shipment records",
      icon: Package,
      iconStyle: "bg-green-100 text-green-800",
      accent: "from-green-500 to-emerald-400",
    },
    {
      label: "Delivered",
      value: deliveredShipments,
      description: "Successfully completed",
      icon: CheckCircle2,
      iconStyle: "bg-emerald-100 text-emerald-700",
      accent: "from-emerald-500 to-teal-400",
    },
    {
      label: "In progress",
      value: pendingShipments,
      description: "Pending or moving",
      icon: Clock3,
      iconStyle: "bg-amber-100 text-amber-700",
      accent: "from-amber-400 to-orange-400",
    },
    {
      label: "Other statuses",
      value: otherShipments,
      description: "Review shipment updates",
      icon: Truck,
      iconStyle: "bg-blue-100 text-blue-700",
      accent: "from-blue-500 to-cyan-400",
    },
  ];

  const scrollToForm = () => {
    document
      .getElementById("create-shipment")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const handleRefresh = () => {
    fetchShipments(true);
  };

  return (
    <MainLayout>
      <div
        ref={pageRef}
        className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-5 sm:px-6 lg:px-8"
      >
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="supply-orb absolute -right-24 top-10 h-80 w-80 rounded-full bg-emerald-300/25 blur-3xl" />

          <div className="supply-orb absolute -left-24 top-[500px] h-80 w-80 rounded-full bg-lime-300/20 blur-3xl" />

          <div className="supply-orb absolute right-1/3 top-[950px] h-64 w-64 rounded-full bg-teal-200/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Hero */}
          <section className="supply-hero group relative mb-5 overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-950 via-green-900 to-green-700 p-6 shadow-2xl shadow-green-950/15 sm:p-9 lg:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:24px_24px]" />

            <div className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full border border-white/10" />

            <div className="pointer-events-none absolute -right-5 -top-12 h-64 w-64 rounded-full border border-white/10" />

            <div className="supply-orb absolute -right-12 top-0 h-64 w-64 rounded-full bg-lime-300/10 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-lime-200 backdrop-blur-xl">
                  <Sparkles size={15} />
                  AgriLink AI
                  <span className="h-1 w-1 rounded-full bg-lime-300" />
                  Supply chain
                </div>

                <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Your harvest.
                  <span className="mt-1 block bg-gradient-to-r from-lime-200 via-lime-300 to-emerald-200 bg-clip-text text-transparent">
                    Your supply chain.
                  </span>
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-7 text-green-100/80 sm:text-base">
                  Manage agricultural shipments, monitor delivery
                  progress, and keep every journey organized from farm
                  to destination.
                </p>

                <button
                  type="button"
                  onClick={scrollToForm}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-lime-300 px-5 py-3 font-bold text-green-950 shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:bg-lime-200 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-lime-200/40"
                >
                  <Package size={19} />
                  Create a shipment
                  <ArrowDown size={17} />
                </button>
              </div>

              <div className="hidden items-center justify-center lg:flex">
                <div className="supply-hero-icon relative flex h-36 w-36 items-center justify-center rounded-[2.5rem] border border-white/20 bg-white/10 text-lime-300 shadow-2xl shadow-black/10 backdrop-blur-xl">
                  <div className="absolute inset-3 rounded-[2rem] border border-white/10" />
                  <Truck size={70} strokeWidth={1.2} />

                  <div className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-lime-300 text-green-950 shadow-lg">
                    <Leaf size={23} />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-4 text-xs font-medium text-green-100/75 sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-lime-300" />
                Shipment history
              </span>

              <span className="inline-flex items-center gap-2">
                <MapPin size={16} className="text-lime-300" />
                Destination tracking
              </span>

              <span className="inline-flex items-center gap-2">
                <Sprout size={16} className="text-lime-300" />
                Farmer-focused logistics
              </span>
            </div>
          </section>

       

          {/* Create shipment */}
          <section
            id="create-shipment"
            className="supply-create-section scroll-mt-2 "
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                <Package size={21} />
              </div>

              <div>
                <p className="text-xs font-bold mt-4 uppercase tracking-[0.16em] text-emerald-700">
                  Shipment management
                </p>

                <h2 className="mt-0.5 text-2xl font-black tracking-tight text-slate-900">
                  Create a new shipment
                </h2>
              </div>
            </div>

            <CreateShipmentForm
              fetchShipments={() => fetchShipments(true)}
            />
          </section>

          {/* Shipment history */}
          <section ref={historyRef} className="mt-10">
            <div className="supply-history-heading mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-green-700">
                  <Boxes size={16} />
                  Your logistics
                </div>

                <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                  Shipment history
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
                  View your shipment records and follow the latest
                  updates across your agricultural supply chain.
                </p>
              </div>

              <button
                type="button"
                onClick={handleRefresh}
                disabled={refreshing}
                className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-green-200 bg-white px-4 py-3 text-sm font-bold text-green-800 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-green-400 hover:bg-green-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
              >
                <RefreshCw
                  size={17}
                  className={refreshing ? "animate-spin" : ""}
                />

                {refreshing ? "Refreshing..." : "Refresh shipments"}
              </button>
            </div>

            {/* Error state */}
            {error && (
              <div
                role="alert"
                className="mb-6 flex flex-col gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle
                    size={21}
                    className="mt-0.5 shrink-0 text-red-600"
                  />

                  <div>
                    <h3 className="font-bold text-red-900">
                      Could not load shipments
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-red-700">
                      {error}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => fetchShipments()}
                  className="rounded-xl bg-red-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-800 sm:ml-auto"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Loading skeletons */}
            {loading ? (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
                  >
                    <div className="h-5 w-1/3 rounded bg-gray-200" />
                    <div className="mt-5 h-4 w-2/3 rounded bg-gray-100" />
                    <div className="mt-3 h-4 w-1/2 rounded bg-gray-100" />
                    <div className="mt-6 h-20 rounded-2xl bg-gray-100" />
                  </div>
                ))}
              </div>
            ) : !error && shipments.length === 0 ? (
              <div className="group overflow-hidden rounded-3xl border border-dashed border-green-200 bg-white px-6 py-12 text-center shadow-sm transition duration-300 hover:border-green-300 hover:shadow-lg sm:px-10">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-green-50 text-green-700 transition duration-300 group-hover:rotate-3 group-hover:scale-105">
                  <Package size={38} strokeWidth={1.5} />
                </div>

                <h3 className="mt-5 text-2xl font-extrabold text-gray-900">
                  Your shipment journey starts here
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
                  You don't have any shipments yet. Create your first
                  shipment above to start organizing your agricultural
                  deliveries.
                </p>

                <button
                  type="button"
                  onClick={scrollToForm}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-800 px-5 py-3 font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-green-900 hover:shadow-lg"
                >
                  <Package size={18} />
                  Create your first shipment
                  <ArrowDown size={16} />
                </button>
              </div>
            ) : !error ? (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {shipments.map((shipment) => (
                  <div
                    key={shipment._id}
                    className="supply-shipment-card group relative min-w-0 rounded-3xl border border-emerald-100/70 bg-white p-1 shadow-[0_8px_30px_rgba(6,78,59,0.04)] transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-[0_18px_40px_rgba(6,78,59,0.10)]"
                  >
                    <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative overflow-hidden rounded-[1.35rem]">
                      <ShipmentCard shipment={shipment} />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </section>

          {/* Footer */}
          <footer className="mt-10 border-t border-green-100 py-6">
            <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
              <div className="flex items-center gap-2 text-sm font-extrabold text-green-950">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100 text-green-800">
                  <Leaf size={19} />
                </div>

                AgriLink AI
              </div>

              <p className="text-xs leading-5 text-gray-400">
                Smarter agricultural logistics, from farm to destination.
              </p>

              <div className="inline-flex items-center gap-2 text-xs font-medium text-green-700">
                <TrendingUp size={15} />
                Growing together
              </div>
            </div>
          </footer>
        </div>
      </div>
    </MainLayout>
  );
};

export default SupplyChain;