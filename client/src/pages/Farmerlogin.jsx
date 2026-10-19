
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", form);

      const token = response.data.token;
      const user = response.data.user;

      if (user?.role !== "farmer") {
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "Only Farmer accounts can login here.",
          background: "#0f172a",
          color: "#ffffff",
        });
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      await Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome to AgriLink AI 🌱",
        timer: 1200,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#ffffff",
      });

      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#050816] overflow-hidden flex items-center justify-center relative p-3 sm:p-4">
      {/* Error Popup */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="fixed top-4 right-4 bg-red-500 text-white px-5 py-3 rounded-xl shadow-2xl z-50 text-sm"
          >
            ❌ {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ repeat: Infinity, duration: 20 }}
        className="absolute w-[500px] h-[500px] bg-green-500/20 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-5 left-5 w-64 h-64 bg-green-500/20 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="absolute bottom-5 right-5 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-6xl h-full max-h-full grid grid-cols-1 lg:grid-cols-2 bg-white/10 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.15)]"
      >
        {/* LEFT SIDE */}
        <div className="hidden lg:flex relative flex-col justify-between p-6 xl:p-8 bg-gradient-to-br from-green-950/40 via-black to-green-900/30 overflow-hidden min-h-0">
          {/* Floating Shapes */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
            className="absolute top-5 left-5 w-28 h-28 border border-green-400/20 rounded-full pointer-events-none"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
            className="absolute bottom-5 right-5 w-32 h-32 border border-green-300/10 rounded-3xl pointer-events-none"
          />

          {/* Logo & Heading */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 px-3 py-2 rounded-full text-green-300 text-xs font-semibold">
              🚀 Smart Agriculture Platform
            </div>

            <h1 className="text-5xl xl:text-6xl font-black leading-tight bg-gradient-to-r from-green-300 via-green-400 to-emerald-500 bg-clip-text text-transparent mt-4">
              AgriLink
              <br />
              AI
            </h1>

            <p className="mt-3 text-gray-300 text-sm leading-6 max-w-md">
              AI-powered agriculture ecosystem integrating crop intelligence,
              smart logistics, predictive analytics and digital farmer
              management.
            </p>

            {/* Feature Chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              <div className="px-3 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-xs">
                🤖 AI Prediction
              </div>

              <div className="px-3 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-xs">
                🌾 Smart Farming
              </div>

              <div className="px-3 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-xs">
                🚚 Smart Logistics
              </div>

              <div className="px-3 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-xs">
                📊 Analytics
              </div>
            </div>
          </div>

          {/* Agriculture Image */}
          <motion.img
            animate={{
              y: [0, -8, 0],
              scale: [1, 1.01, 1],
            }}
            transition={{ repeat: Infinity, duration: 5 }}
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop"
            alt="Agriculture"
            className="relative z-10 w-full h-[clamp(120px,22vh,220px)] object-cover rounded-2xl my-4 shadow-[0_20px_40px_rgba(34,197,94,0.25)]"
          />

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-3 relative z-10">
            <div className="text-center">
              <h2 className="text-xl font-bold text-green-400">500+</h2>
              <p className="text-xs text-gray-400">Farmers</p>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold text-green-400">98%</h2>
              <p className="text-xs text-gray-400">AI Accuracy</p>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold text-green-400">24/7</h2>
              <p className="text-xs text-gray-400">Support</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE LOGIN */}
        <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8 min-h-0 overflow-hidden">
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            {/* Mobile Branding */}
            <div className="lg:hidden mb-5 text-center">
              <h1 className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                AgriLink AI
              </h1>
              <p className="text-gray-400 text-xs mt-1">
                🌱 Smart Agriculture Platform
              </p>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl xl:text-5xl font-black bg-gradient-to-r from-green-400 via-green-500 to-emerald-400 bg-clip-text text-transparent"
            >
              Farmer Login
            </motion.h1>

            <p className="text-gray-400 mt-2 mb-5 text-sm">
              Access your AgriLink AI dashboard
            </p>

            <div className="space-y-4">
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email"
                name="email"
                value={form.email}
                placeholder="Email Address"
                autoComplete="email"
                required
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/10 text-white placeholder-gray-400 p-3.5 rounded-xl outline-none focus:ring-4 focus:ring-green-500/30 focus:border-green-500 transition-all"
              />

              <div className="relative">
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/10 text-white placeholder-gray-400 p-3.5 pr-12 rounded-xl outline-none focus:ring-4 focus:ring-green-500/30 focus:border-green-500 transition-all"
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400 transition-all"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="w-full mt-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all text-black font-bold py-3.5 rounded-xl disabled:opacity-60"
            >
              {loading ? "Signing In..." : "🚀 Login"}
            </motion.button>

            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="px-3 text-xs text-gray-400">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <Link to="/register" className="block">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-center bg-white/5 border border-green-500/30 hover:bg-green-500/10 hover:border-green-500 transition-all text-white py-3.5 rounded-xl"
              >
                Create Account
              </motion.div>
            </Link>

            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-center text-xs text-gray-500 mt-5"
            >
              🌱 Building the Future of Smart Agriculture with AI
            </motion.p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
