
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import MainLayout from "../layouts/MainLayout";
import {
  CloudSun,
  Droplets,
  Wind,
  Thermometer,
  Sunrise,
  Sunset,
  CloudRain,
  Trees,
  RefreshCw,
  MapPin,
  AlertCircle,
  Sprout,
} from "lucide-react";

const API_URL = "https://api.open-meteo.com/v1/forecast";

const weatherInfo = (code) => {
  if (code === 0) return { icon: "☀️", label: "Clear Sky" };
  if ([1, 2].includes(code)) return { icon: "🌤️", label: "Partly Cloudy" };
  if (code === 3) return { icon: "☁️", label: "Overcast" };
  if ([45, 48].includes(code)) return { icon: "🌫️", label: "Foggy" };
  if ([51, 53, 55, 56, 57].includes(code))
    return { icon: "🌦️", label: "Drizzle" };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    return { icon: "🌧️", label: "Rain" };
  if ([71, 73, 75, 77, 85, 86].includes(code))
    return { icon: "❄️", label: "Snow" };
  if ([95, 96, 99].includes(code))
    return { icon: "⛈️", label: "Thunderstorm" };

  return { icon: "🌤️", label: "Variable Conditions" };
};

const formatTime = (value) => {
  if (!value) return "--:--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--:--";

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [locationName, setLocationName] = useState("Your Location");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const pageRef = useRef(null);
  const animationRef = useRef(null);

  const loadWeather = useCallback((latitude, longitude) => {
    let cancelled = false;

    const fetchWeather = async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          latitude: String(latitude),
          longitude: String(longitude),
          current:
            "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m",
          daily:
            "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset",
          timezone: "auto",
          forecast_days: "7",
        });

        const response = await fetch(`${API_URL}?${params}`);

        if (!response.ok) {
          throw new Error("Weather service is temporarily unavailable.");
        }

        const data = await response.json();

        if (!data.current || !data.daily) {
          throw new Error("Weather data was not returned by the service.");
        }

        if (cancelled) return;

        setWeather(data.current);

        const days = data.daily.time.map((date, index) => ({
          date,
          day: new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", {
            weekday: "short",
          }),
          max: data.daily.temperature_2m_max[index],
          min: data.daily.temperature_2m_min[index],
          rain: data.daily.precipitation_probability_max?.[index],
          code: data.daily.weather_code[index],
          sunrise: data.daily.sunrise?.[index],
          sunset: data.daily.sunset?.[index],
        }));

        setForecast(days);
        setLocationName(
          `${Number(latitude).toFixed(2)}°, ${Number(longitude).toFixed(2)}°`
        );
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load weather data.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchWeather();

    return () => {
      cancelled = true;
    };
  }, []);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Your browser does not support location access.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        loadWeather(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      (geoError) => {
        setLoading(false);

        if (geoError.code === 1) {
          setError(
            "Location permission denied. Allow location access in your browser and try again."
          );
        } else if (geoError.code === 2) {
          setError("Your location could not be detected. Check your device GPS.");
        } else {
          setError("Location request timed out. Please try again.");
        }
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 }
    );
  }, [loadWeather]);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  useEffect(() => {
    if (loading || error || !weather || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".weather-hero",
        { opacity: 0, y: -25 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );

      gsap.fromTo(
        ".weather-card",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.12,
          delay: 0.15,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".weather-section",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.15,
          delay: 0.35,
          ease: "power2.out",
        }
      );

      gsap.to(".weather-glow", {
        y: -12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, pageRef);

    animationRef.current = ctx;
    return () => ctx.revert();
  }, [loading, error, weather, forecast]);

  const currentInfo = weather
    ? weatherInfo(weather.weather_code)
    : null;

  const today = forecast[0];

  return (
    <MainLayout>
      <main
        ref={pageRef}
        className="relative min-h-screen overflow-x-hidden bg-slate-50 px-3 py-5 text-slate-800 sm:px-6 sm:py-7 lg:px-8"
      >
        <div className="weather-glow pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-emerald-200/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl space-y-6 sm:space-y-8">
          {/* Header */}
          <section className="weather-hero relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-green-700 to-teal-600 p-5 text-white shadow-xl sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full border-[24px] border-white/10 sm:h-64 sm:w-64" />

            <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
                  <Sprout size={15} />
                  AGRILINK AI · SMART FARMING
                </div>

                <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                  Weather Intelligence
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-green-100 sm:text-base">
                  Real-time weather conditions and a 7-day forecast to help
                  you make smarter farming decisions.
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm text-green-100">
                  <MapPin size={16} />
                  <span>{locationName}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-6xl sm:text-7xl">
                  {currentInfo?.icon || "🌦️"}
                </div>
                <div>
                  <p className="text-sm text-green-100">Current weather</p>
                  <p className="text-lg font-bold">
                    {currentInfo?.label || "Checking..."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Loading */}
          {loading && (
            <div className="flex min-h-52 flex-col items-center justify-center gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
              <p className="font-semibold text-slate-600">
                Fetching your local weather...
              </p>
              <p className="text-center text-sm text-slate-400">
                Please allow location access when prompted.
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-3">
                <AlertCircle className="mt-1 shrink-0 text-amber-600" />
                <div>
                  <h2 className="font-bold text-amber-900">
                    Weather unavailable
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-amber-800">
                    {error}
                  </p>
                </div>
              </div>

              <button
                onClick={requestLocation}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-amber-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-amber-800"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            </div>
          )}

          {/* Current Conditions */}
          {!loading && !error && weather && (
            <>
              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <article className="weather-card rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-500">
                      Temperature
                    </span>
                    <Thermometer className="text-orange-500" size={23} />
                  </div>
                  <p className="mt-5 text-4xl font-black tracking-tight">
                    {Math.round(weather.temperature_2m)}°C
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Feels like {Math.round(weather.apparent_temperature)}°C
                  </p>
                </article>

                <article className="weather-card rounded-2xl border border-sky-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-500">
                      Humidity
                    </span>
                    <Droplets className="text-sky-500" size={23} />
                  </div>
                  <p className="mt-5 text-4xl font-black tracking-tight">
                    {weather.relative_humidity_2m}%
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Relative humidity
                  </p>
                </article>

                <article className="weather-card rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-500">
                      Wind Speed
                    </span>
                    <Wind className="text-cyan-600" size={23} />
                  </div>
                  <p className="mt-5 text-4xl font-black tracking-tight">
                    {Math.round(weather.wind_speed_10m)}
                    <span className="ml-1 text-lg font-semibold">km/h</span>
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    At 10 metres
                  </p>
                </article>

                <article className="weather-card rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-500">
                      Rain Chance
                    </span>
                    <CloudRain className="text-indigo-500" size={23} />
                  </div>
                  <p className="mt-5 text-4xl font-black tracking-tight">
                    {today?.rain ?? "—"}
                    {today?.rain != null ? "%" : ""}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Today's precipitation probability
                  </p>
                </article>
              </section>

              {/* Farming Advice & Sun Cycle */}
              <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <motion.article
                  whileHover={{ y: -2 }}
                  className="weather-section rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-7"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                      <Trees size={23} />
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold">
                        Farming Insights
                      </h2>
                      <p className="text-sm text-slate-500">
                        Weather-based suggestions
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-3 rounded-xl bg-emerald-50 p-4">
                      <Sprout className="mt-0.5 shrink-0 text-emerald-700" />
                      <div>
                        <p className="font-bold text-emerald-900">
                          Irrigation planning
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {today?.rain >= 60
                            ? "Rain probability is high. Check soil moisture before scheduling irrigation."
                            : "Check soil moisture and crop requirements before watering. Early morning irrigation can reduce evaporation."}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 rounded-xl bg-sky-50 p-4">
                      <Droplets className="mt-0.5 shrink-0 text-sky-700" />
                      <div>
                        <p className="font-bold text-sky-900">
                          Moisture monitoring
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          Current relative humidity is{" "}
                          {weather.relative_humidity_2m}%. Check the crop and
                          field conditions before making spray decisions.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 rounded-xl bg-amber-50 p-4">
                      <Thermometer className="mt-0.5 shrink-0 text-amber-700" />
                      <div>
                        <p className="font-bold text-amber-900">
                          Temperature watch
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          Current temperature is{" "}
                          {Math.round(weather.temperature_2m)}°C. Consider
                          crop-specific heat thresholds when planning field work.
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-xs leading-5 text-slate-400">
                    Suggestions are general guidance, not crop-specific AI
                    predictions.
                  </p>
                </motion.article>

                <motion.article
                  whileHover={{ y: -2 }}
                  className="weather-section rounded-2xl border border-orange-100 bg-white p-5 shadow-sm sm:p-7"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-xl bg-orange-100 p-3 text-orange-700">
                      <Sunrise size={23} />
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold">Sun Cycle</h2>
                      <p className="text-sm text-slate-500">
                        Local sunrise and sunset
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-xl bg-amber-50 p-4">
                      <div className="flex items-center gap-3">
                        <Sunrise className="text-amber-600" size={24} />
                        <span className="font-medium">Sunrise</span>
                      </div>
                      <strong className="text-lg">
                        {formatTime(today?.sunrise)}
                      </strong>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-orange-50 p-4">
                      <div className="flex items-center gap-3">
                        <Sunset className="text-orange-600" size={24} />
                        <span className="font-medium">Sunset</span>
                      </div>
                      <strong className="text-lg">
                        {formatTime(today?.sunset)}
                      </strong>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                    <p className="font-bold text-emerald-800">
                      🌱 GreenTech Tip
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Use local weather and soil moisture readings together
                      when planning irrigation to help conserve water.
                    </p>
                  </div>
                </motion.article>
              </section>

              {/* Actual 7-day forecast */}
              <section className="weather-section rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-black">
                      7-Day Weather Forecast
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Daily maximum and minimum temperatures
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700">
                    LIVE API DATA
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7">
                  {forecast.map((day, index) => {
                    const info = weatherInfo(day.code);

                    return (
                      <motion.article
                        key={day.date}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className={`rounded-2xl border p-4 text-center ${
                          index === 0
                            ? "border-emerald-300 bg-emerald-50"
                            : "border-slate-100 bg-slate-50"
                        }`}
                      >
                        <p className="font-bold">{index === 0 ? "Today" : day.day}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {new Date(`${day.date}T12:00:00`).toLocaleDateString(
                            "en-IN",
                            { day: "numeric", month: "short" }
                          )}
                        </p>

                        <div className="my-3 text-4xl">{info.icon}</div>
                        <p className="text-sm font-semibold text-slate-700">
                          {info.label}
                        </p>

                        <p className="mt-3 text-xl font-black text-emerald-800">
                          {Math.round(day.max)}°
                        </p>
                        <p className="text-sm text-slate-500">
                          Low {Math.round(day.min)}°
                        </p>

                        <div className="mt-3 flex items-center justify-center gap-1 text-xs text-sky-700">
                          <Droplets size={13} />
                          {day.rain ?? "—"}
                          {day.rain != null ? "%" : ""}
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </section>

              {/* Footer */}
              <footer className="weather-section rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-600 p-6 text-center text-white sm:p-8">
                <div className="mb-3 flex justify-center">
                  <CloudSun size={36} />
                </div>
                <h2 className="text-2xl font-black">
                  AgriLink AI Weather Intelligence
                </h2>
                <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-emerald-100">
                  Weather awareness for smarter farming, informed irrigation
                  and sustainable resource management.
                </p>
                <p className="mt-4 text-xs text-emerald-100/80">
                  Weather source: Open-Meteo · Forecasts may change.
                </p>
              </footer>
            </>
          )}
        </div>
      </main>
    </MainLayout>
  );
};

export default Weather;
