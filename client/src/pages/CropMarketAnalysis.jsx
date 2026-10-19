
import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Sprout,
  Search,
  RefreshCw,
  AlertCircle,
  BarChart3,
  IndianRupee,
  CalendarDays,
  ShieldCheck,
  Info,
} from "lucide-react";
import MainLayout from "../layouts/MainLayout";

const API_URL = "http://localhost:5000/api/market/crop-analysis";
const popularCrops = ["Wheat", "Rice", "Soybean", "Cotton", "Maize"];

const money = (value) => {
  const number = Number(value);
  if (value == null || value === "" || !Number.isFinite(number)) return "—";

  return `₹${number.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
};

const percent = (value) => {
  if (value == null || value === "") return "—";
  const number = Number(value);
  return Number.isFinite(number) ? `${number.toFixed(2)}%` : "—";
};

const validPriceRecords = (records) => {
  if (!Array.isArray(records)) return [];

  return records
    .filter(
      (item) =>
        item &&
        item.year != null &&
        item.price != null &&
        item.price !== "" &&
        Number.isFinite(Number(item.price))
    )
    .sort((a, b) => {
      const yearA = Number(a.year);
      const yearB = Number(b.year);

      if (Number.isFinite(yearA) && Number.isFinite(yearB)) {
        return yearA - yearB;
      }

      return String(a.year).localeCompare(String(b.year));
    });
};

const CropMarketAnalysis = () => {
  const [crop, setCrop] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async (selectedCrop = crop) => {
    const cropName = selectedCrop.trim();

    if (!cropName) {
      setError("Please enter a crop name.");
      return;
    }

    if (loading) return;

    setCrop(cropName);
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ crop: cropName }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            `Request failed with status ${response.status}`
        );
      }

      const historical = validPriceRecords(data.historical);
      const future = validPriceRecords(data.future);

      if (historical.length === 0 && future.length === 0) {
        throw new Error(
          "API ne valid historical ya forecast prices return nahi kiye. Backend response check karein."
        );
      }

      setResult({
        ...data,
        crop: data.crop || cropName,
        historical,
        future,
      });
    } catch (err) {
      const message = String(err.message || "");

      setError(
        message.includes("Failed to fetch")
          ? "Backend se connection nahi ho raha. Check karein ki server port 5000 par running hai aur CORS enabled hai."
          : message || "Crop analysis failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const history = result?.historical || [];
  const future = result?.future || [];

  const latestHistorical = history.length
    ? history[history.length - 1]
    : null;

  const lastPrediction = future.length
    ? future[future.length - 1]
    : null;

  const growth = Number(result?.growth_percent);
  const hasGrowth =
    result?.growth_percent != null &&
    result?.growth_percent !== "" &&
    Number.isFinite(growth);

  const historicalIsRising =
    history.length > 1 &&
    Number(history[history.length - 1].price) >=
      Number(history[0].price);

  const allPrices = [...history, ...future]
    .map((item) => Number(item.price))
    .filter(Number.isFinite);

  const minPrice = allPrices.length ? Math.min(...allPrices) : 0;
  const maxPrice = allPrices.length ? Math.max(...allPrices) : 0;
  const priceRange = maxPrice - minPrice || 1;

  return (
    <MainLayout>
      <main className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-3 py-5 text-slate-800 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-green-800 to-teal-700 p-5 text-white shadow-xl sm:p-8 lg:p-10"
          >
            <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border-[30px] border-white/10" />
            <div className="pointer-events-none absolute -bottom-24 right-40 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold tracking-wide">
                  <Sprout size={15} />
                  AGRILINK AI · MARKET INTELLIGENCE
                </div>

                <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                  Crop Market Analysis
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-100 sm:text-base">
                  Analyze crop prices, explore historical records and review
                  model-generated future estimates from your market API.
                </p>
              </div>

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <BarChart3 size={42} />
              </div>
            </div>
          </motion.section>

          {/* Search */}
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                <Search size={22} />
              </div>

              <div>
                <h2 className="text-xl font-extrabold">Analyze a Crop</h2>
                <p className="text-sm text-slate-500">
                  Enter a crop supported by your backend API.
                </p>
              </div>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleAnalyze();
              }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                value={crop}
                onChange={(event) => setCrop(event.target.value)}
                placeholder="e.g. Wheat, Rice, Soybean..."
                aria-label="Crop name"
                disabled={loading}
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BarChart3 size={18} />
                    Analyze Market
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-semibold text-slate-500">
                TRY A CROP
              </span>

              {popularCrops.map((item) => (
                <button
                  key={item}
                  type="button"
                  disabled={loading}
                  onClick={() => handleAnalyze(item)}
                  className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100 disabled:opacity-50"
                >
                  {item}
                </button>
              ))}
            </div>

            {error && (
              <div
                role="alert"
                className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
              >
                <AlertCircle className="mt-0.5 shrink-0" size={20} />
                <div>
                  <p className="font-bold">Analysis unavailable</p>
                  <p className="mt-1 leading-6">{error}</p>
                </div>
              </div>
            )}
          </section>

          {/* Loading */}
          {loading && (
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="h-4 w-28 rounded bg-slate-200" />
                  <div className="mt-5 h-9 w-36 rounded bg-slate-200" />
                  <div className="mt-4 h-3 w-24 rounded bg-slate-100" />
                </div>
              ))}
            </section>
          )}

          {/* Results */}
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-6"
            >
              <section className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-semibold text-emerald-700">
                    MARKET REPORT
                  </p>
                  <h2 className="mt-1 text-2xl font-black sm:text-3xl">
                    {result.crop} Price Overview
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => handleAnalyze(crop)}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold transition hover:bg-slate-100 sm:self-auto"
                >
                  <RefreshCw size={16} />
                  Refresh Analysis
                </button>
              </section>

              {/* Metrics */}
              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                  title="Latest Historical Price"
                  value={money(latestHistorical?.price)}
                  subtitle={
                    latestHistorical
                      ? `Year: ${latestHistorical.year}`
                      : "No historical observation"
                  }
                  icon={<IndianRupee size={21} />}
                  color="emerald"
                />

                <MetricCard
                  title="Reported Growth"
                  value={hasGrowth ? percent(growth) : "—"}
                  subtitle="Value returned by the API"
                  icon={
                    hasGrowth && growth >= 0 ? (
                      <TrendingUp size={21} />
                    ) : (
                      <TrendingDown size={21} />
                    )
                  }
                  color={hasGrowth && growth >= 0 ? "green" : "orange"}
                />

                <MetricCard
                  title="Price Volatility"
                  value={
                    result.volatility != null
                      ? money(result.volatility)
                      : "—"
                  }
                  subtitle="API-reported volatility"
                  icon={<Activity size={21} />}
                  color="blue"
                />

                <MetricCard
                  title="Forecast End Price"
                  value={money(lastPrediction?.price)}
                  subtitle={
                    lastPrediction
                      ? `Forecast year: ${lastPrediction.year}`
                      : "No forecast available"
                  }
                  icon={<CalendarDays size={21} />}
                  color="purple"
                />
              </section>

              {/* Summary */}
              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-indigo-100 p-3 text-indigo-700">
                      <Activity size={22} />
                    </div>

                    <div>
                      <h3 className="text-lg font-extrabold">
                        Market Trend Summary
                      </h3>
                      <p className="text-sm text-slate-500">
                        Based on the API analysis
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                      Trend: {result.trend || "Not provided"}
                    </span>

                    <span
                      className={`rounded-full px-4 py-2 text-sm font-bold ${
                        history.length > 1 && historicalIsRising
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-orange-50 text-orange-700"
                      }`}
                    >
                      Historical direction:{" "}
                      {history.length > 1
                        ? historicalIsRising
                          ? "Upward"
                          : "Downward"
                        : "Insufficient data"}
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    {result.suggestion ||
                      "No recommendation was supplied by the API."}
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 sm:p-6">
                  <div className="flex items-center gap-3 text-emerald-800">
                    <ShieldCheck size={23} />
                    <h3 className="text-lg font-extrabold">
                      Decision Support
                    </h3>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-emerald-900">
                    Compare market estimates with current local mandi prices,
                    crop quality, transport costs and applicable MSP before
                    deciding when to sell.
                  </p>

                  <p className="mt-4 text-xs leading-5 text-emerald-800/80">
                    Forecasts are estimates, not guaranteed selling prices.
                  </p>
                </div>
              </section>

              {/* Historical chart */}
              <PriceChart
                title="Historical Price Trend"
                subtitle="Observed values returned by your API"
                data={history}
                minPrice={minPrice}
                priceRange={priceRange}
                type="history"
              />

              {/* Future chart */}
              <PriceChart
                title="Future Price Forecast"
                subtitle="Predictions returned by your forecasting service"
                data={future}
                minPrice={minPrice}
                priceRange={priceRange}
                type="future"
              />

              {future.length === 0 && (
                <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  <Info size={20} className="mt-0.5 shrink-0" />
                  <p>
                    Backend ne future predictions return nahi ki. Forecasting
                    model aur API response mein <code>future</code> array check
                    karein.
                  </p>
                </div>
              )}

              {/* Historical table */}
              <PriceTable
                title="Historical Price Records"
                subtitle={`${history.length} historical records supplied by the API`}
                data={history}
                type="history"
              />

              {/* Forecast table */}
              {future.length > 0 && (
                <PriceTable
                  title="Forecast Records"
                  subtitle="Model estimates, not observed market prices"
                  data={future}
                  type="future"
                />
              )}

              <p className="px-1 text-xs leading-5 text-slate-500">
                Data quality depends on the connected API. Verify the market,
                price unit, crop variety, observation dates and forecasting
                method before relying on estimates.
              </p>
            </motion.div>
          )}

          {/* Empty state */}
          {!result && !loading && !error && (
            <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center sm:py-16">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <BarChart3 size={32} />
              </div>

              <h2 className="mt-5 text-xl font-extrabold">
                Start your crop analysis
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Search for a crop above to view historical records and future
                estimates returned by your market analysis API.
              </p>
            </section>
          )}
        </div>
      </main>
    </MainLayout>
  );
};

const MetricCard = ({ title, value, subtitle, icon, color }) => {
  const themes = {
    emerald: "bg-emerald-50 text-emerald-700",
    green: "bg-green-50 text-green-700",
    orange: "bg-orange-50 text-orange-700",
    blue: "bg-sky-50 text-sky-700",
    purple: "bg-violet-50 text-violet-700",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-500">{title}</p>
        <div className={`rounded-xl p-2.5 ${themes[color] || themes.emerald}`}>
          {icon}
        </div>
      </div>

      <p className="mt-5 break-words text-3xl font-black tracking-tight text-slate-900">
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-500">{subtitle}</p>
    </motion.article>
  );
};

const PriceChart = ({
  title,
  subtitle,
  data,
  minPrice,
  priceRange,
  type,
}) => {
  const isFuture = type === "future";

  const prices = data
    .map((item) => Number(item.price))
    .filter(Number.isFinite);

  const localMin = prices.length ? Math.min(...prices) : 0;
  const localMax = prices.length ? Math.max(...prices) : 0;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-extrabold">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>

        <span
          className={`self-start rounded-full px-3 py-1.5 text-xs font-bold ${
            isFuture
              ? "bg-violet-50 text-violet-700"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {isFuture ? "PREDICTED DATA" : "HISTORICAL DATA"}
        </span>
      </div>

      {data.length === 0 ? (
        <div className="mt-6 rounded-xl bg-slate-50 p-8 text-center text-sm text-slate-500">
          No {isFuture ? "forecast" : "historical"} price records available.
        </div>
      ) : (
        <>
          <div className="mt-8 flex h-64 items-end gap-2 overflow-x-auto border-b border-l border-slate-200 px-2 sm:gap-4">
            {data.map((item, index) => {
              const price = Number(item.price);
              const height = Math.max(
                8,
                ((price - minPrice) / priceRange) * 75 + 20
              );

              return (
                <div
                  key={`${item.year}-${index}`}
                  title={`${item.year}: ${money(price)}`}
                  className="group flex h-full min-w-12 flex-1 flex-col items-center justify-end"
                >
                  <span className="mb-2 whitespace-nowrap text-[10px] font-bold text-slate-600 sm:text-xs">
                    {money(price)}
                  </span>

                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{
                      duration: 0.65,
                      delay: Math.min(index * 0.04, 0.4),
                    }}
                    className={`w-full max-w-14 rounded-t-lg transition-opacity group-hover:opacity-75 ${
                      isFuture
                        ? "bg-gradient-to-t from-violet-700 to-fuchsia-400"
                        : "bg-gradient-to-t from-emerald-700 to-teal-400"
                    }`}
                  />

                  <span className="mt-2 w-full truncate text-center text-[10px] font-semibold text-slate-500 sm:text-xs">
                    {item.year}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>{data.length} data points</span>
            <span>
              Range: {money(localMin)} – {money(localMax)}
            </span>
          </div>
        </>
      )}
    </section>
  );
};

const PriceTable = ({ title, subtitle, data, type }) => {
  const isFuture = type === "future";

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div
        className={`border-b p-5 sm:p-6 ${
          isFuture
            ? "border-violet-100 bg-violet-50/70"
            : "border-slate-100"
        }`}
      >
        <h3 className="text-xl font-extrabold">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>

      {data.length === 0 ? (
        <p className="p-6 text-sm text-slate-500">No records available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[360px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">Year / Date</th>
                <th className="px-5 py-4 text-right">
                  {isFuture ? "Estimated price (₹)" : "Price (₹)"}
                </th>
                <th className="px-5 py-4 text-right">Record type</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr
                  key={`${item.year}-${index}`}
                  className="border-t border-slate-100 transition hover:bg-slate-50"
                >
                  <td className="px-5 py-4 font-semibold">{item.year}</td>

                  <td
                    className={`px-5 py-4 text-right font-bold ${
                      isFuture ? "text-violet-700" : "text-slate-800"
                    }`}
                  >
                    {money(item.price)}
                  </td>

                  <td className="px-5 py-4 text-right text-slate-500">
                    {isFuture ? "Predicted" : "Historical"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default CropMarketAnalysis;
