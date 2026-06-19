import { motion } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import { getWeather } from "../services/weatherService";
import {
  CloudSun,
  Droplets,
  Wind,
  Thermometer,
  Sunrise,
  Sunset,
  CloudRain,
  Trees,
} from "lucide-react";

const forecast = [
  { day: "Mon", temp: "31°C", icon: "☀️" },
  { day: "Tue", temp: "29°C", icon: "🌤" },
  { day: "Wed", temp: "27°C", icon: "🌧" },
  { day: "Thu", temp: "30°C", icon: "☁️" },
  { day: "Fri", temp: "32°C", icon: "☀️" },
  { day: "Sat", temp: "28°C", icon: "🌦" },
  { day: "Sun", temp: "30°C", icon: "🌤" },
];

const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const data = await getWeather(latitude, longitude);

          setWeather(data.current);
        } catch (error) {
          console.log(error);
        }
      },
      (error) => {
        console.log("Location permission denied", error);
      },
    );
  }, []);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-gradient-to-r from-green-700 to-emerald-500 rounded-3xl p-10 text-white shadow-2xl"
        >
          <h1 className="text-5xl font-black">🌦 Weather Forecast</h1>

          <p className="mt-3 text-green-100 text-lg">
            AI Powered Smart Farming Weather & Environmental Monitoring
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-3xl shadow-xl p-6 text-center"
          >
            <CloudSun size={55} className="mx-auto text-yellow-500" />
            <h2 className="text-5xl font-black mt-4">
              {weather ? `${weather.temperature_2m}°C` : "Loading..."}
            </h2>
            <p className="text-gray-500 mt-2">Partly Cloudy</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-3xl shadow-xl p-6 text-center"
          >
            <Droplets size={55} className="mx-auto text-blue-500" />
            <h2 className="text-5xl font-black mt-4">
              {weather ? `${weather.relative_humidity_2m}%` : "Loading..."}
            </h2>
            <p className="text-gray-500 mt-2">Humidity</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-3xl shadow-xl p-6 text-center"
          >
            <Wind size={55} className="mx-auto text-cyan-500" />
            <h2 className="text-5xl font-black mt-4">
              {weather ? `${weather.wind_speed_10m} km/h` : "Loading..."}
            </h2>
            <p className="text-gray-500 mt-2">Wind Speed</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-3xl shadow-xl p-6 text-center"
          >
            <CloudRain size={55} className="mx-auto text-indigo-500" />
            <h2 className="text-5xl font-black mt-4">35%</h2>
            <p className="text-gray-500 mt-2">Rain Chance</p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          {/* AI Farming Recommendation */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-green-700 mb-6">
              🤖 AI Farming Recommendation
            </h2>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <Thermometer className="text-red-500" />
                <span>
                  Ideal Crop: <b>Soybean 🌱</b>
                </span>
              </div>

              <div className="flex items-center gap-4">
                <CloudRain className="text-blue-500" />
                <span>Rain Expected Tomorrow</span>
              </div>

              <div className="flex items-center gap-4">
                <Droplets className="text-cyan-500" />
                <span>Best Irrigation Time: 6:00 AM</span>
              </div>

              <div className="flex items-center gap-4">
                <Trees className="text-green-600" />
                <span>
                  Sustainability Score: <b>92%</b>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Sunrise & Sunset */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-orange-600 mb-6">
              🌅 Sun Cycle
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sunrise className="text-yellow-500" />
                  <span>Sunrise</span>
                </div>

                <b>5:42 AM</b>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sunset className="text-orange-500" />
                  <span>Sunset</span>
                </div>

                <b>6:58 PM</b>
              </div>

              <div className="mt-8 p-5 rounded-2xl bg-green-50 border border-green-200">
                <h3 className="font-bold text-green-700">🌱 GreenTech Tip</h3>

                <p className="text-gray-600 mt-2">
                  Use drip irrigation during early morning to reduce
                  evaporation, save water and improve crop productivity.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            📅 7-Day Weather Forecast
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5">
            {forecast.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                }}
                className="bg-white rounded-3xl shadow-lg p-5 text-center"
              >
                <h3 className="font-bold text-lg">{item.day}</h3>

                <div className="text-5xl my-4">{item.icon}</div>

                <h2 className="text-2xl font-black text-green-700">
                  {item.temp}
                </h2>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 bg-gradient-to-r from-green-700 to-emerald-500 rounded-3xl p-8 text-white text-center shadow-xl"
        >
          <h2 className="text-3xl font-bold">
            🌍 AgriLink AI Weather Intelligence
          </h2>

          <p className="mt-3 text-green-100">
            Smart Weather • AI Farming • Environmental Sustainability • Water
            Conservation • Green Technology
          </p>

          <div className="mt-6 flex justify-center gap-8 flex-wrap">
            <div>
              <h3 className="text-3xl font-black">96%</h3>
              <p>AI Accuracy</p>
            </div>

            <div>
              <h3 className="text-3xl font-black">92%</h3>
              <p>Sustainability</p>
            </div>

            <div>
              <h3 className="text-3xl font-black">12K L</h3>
              <p>Water Saved</p>
            </div>

            <div>
              <h3 className="text-3xl font-black">285kg</h3>
              <p>CO₂ Reduced</p>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Weather;
