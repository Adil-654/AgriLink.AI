
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaLeaf,
  FaTruck,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Details",
        text: "Please fill in all fields.",
        confirmButtonColor: "#16a34a",
      });
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      await Swal.fire({
        icon: "success",
        title: "Welcome to AgriLink AI 🌱",
        text: "Your account has been created successfully!",
        background: "#f0fdf4",
        color: "#166534",
        confirmButtonColor: "#16a34a",
      });

      navigate("/");
    } catch (err) {
      if (err.response?.status === 400) {
        Swal.fire({
          icon: "warning",
          title: "Account Already Exists",
          text: "Please login or use another email.",
          confirmButtonColor: "#f59e0b",
        });
      } else if (err.response?.status >= 500) {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Something went wrong. Please try again.",
          confirmButtonColor: "#dc2626",
        });
      } else if (err.response) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text:
            err.response.data?.message ||
            "Unable to create your account.",
          confirmButtonColor: "#dc2626",
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Network Issue",
          text: "Please check your connection and try again.",
          confirmButtonColor: "#2563eb",
        });
      }

      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <FaRobot />,
      title: "AI Prediction",
    },
    {
      icon: <FaLeaf />,
      title: "Smart Farming",
    },
    {
      icon: <FaTruck />,
      title: "Logistics",
    },
  ];

  return (
    <div className="fixed inset-0 h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-green-100 via-white to-green-200 flex items-center justify-center p-2 sm:p-4">
      {/* Floating Background */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-green-300 opacity-20 blur-3xl"
      />

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-green-500 opacity-20 blur-3xl"
      />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 grid h-full max-h-[850px] w-full max-w-6xl grid-cols-1 overflow-hidden rounded-2xl border border-white/40 bg-white/40 shadow-2xl backdrop-blur-2xl sm:rounded-3xl lg:grid-cols-2"
      >
        {/* Left Side Image */}
        <div className="relative hidden items-center justify-center overflow-hidden bg-gradient-to-br from-green-700 to-green-500 p-8 lg:flex xl:p-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
            className="pointer-events-none absolute h-[340px] w-[340px] rounded-full border border-white/10 xl:h-[400px] xl:w-[400px]"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { duration: 0.7 },
              y: {
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              },
            }}
            className="relative z-10 flex max-w-full flex-col items-center"
          >
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop"
              alt="Farmer working in a field"
              className="h-[min(42vh,340px)] w-[min(27vw,300px)] rounded-3xl object-cover shadow-2xl"
            />

            <div className="mt-5 max-w-sm text-center text-white">
              <h1 className="text-3xl font-black xl:text-4xl">
                Smart Farming
              </h1>

              <p className="mt-3 text-sm leading-6 text-green-100">
                AI-powered agriculture and smart logistics helping
                farmers manage crops and deliveries efficiently.
              </p>

              <div className="mt-5 flex justify-center gap-3">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs">
                  🌱 Smart Agriculture
                </span>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs">
                  🤖 AI Powered
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side Form */}
        <div className="flex min-h-0 items-center justify-center overflow-hidden p-3 sm:p-5 lg:p-7 xl:p-10">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex w-full max-w-sm flex-col"
          >
            {/* Logo */}
            <div className="mb-1 flex items-center justify-center gap-2">
              <motion.span
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
                className="text-3xl sm:text-4xl"
              >
                🌱
              </motion.span>

              <h1 className="bg-gradient-to-r from-green-600 via-green-700 to-green-500 bg-clip-text text-3xl font-black text-transparent sm:text-4xl">
                AgriLink AI
              </h1>
            </div>

            <p className="mb-4 text-center text-xs text-gray-500 sm:mb-5 sm:text-sm">
              🌾 AI-Powered Smart Agriculture Platform
            </p>

            {/* Inputs */}
            <div className="space-y-3">
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="name"
                placeholder="Full Name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full rounded-xl border border-gray-200 bg-white/80 p-3 text-sm outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:opacity-60 sm:rounded-2xl sm:p-3.5"
              />

              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email"
                name="email"
                placeholder="Email Address"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full rounded-xl border border-gray-200 bg-white/80 p-3 text-sm outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:opacity-60 sm:rounded-2xl sm:p-3.5"
              />

              <div className="relative">
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-gray-200 bg-white/80 p-3 pr-11 text-sm outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:opacity-60 sm:rounded-2xl sm:p-3.5"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-green-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-2 py-3 sm:gap-3 sm:py-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  whileHover={{ y: -3, scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-green-100 bg-white/80 p-2 shadow-sm sm:rounded-2xl sm:p-3"
                >
                  <div className="flex justify-center text-2xl text-green-600 sm:text-3xl">
                    {feature.icon}
                  </div>

                  <p className="mt-2 text-center text-[10px] font-bold text-gray-700 sm:text-xs">
                    {feature.title}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-1 space-y-2.5 sm:space-y-3">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className={`w-full rounded-xl py-3 text-sm font-semibold text-white shadow-lg transition-all sm:rounded-2xl sm:py-3.5 ${
                  loading
                    ? "cursor-not-allowed bg-gray-500"
                    : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creating Account...
                  </span>
                ) : (
                  "🚀 Create Account"
                )}
              </motion.button>

              <Link
                to="/"
                className="block"
                onClick={(e) => {
                  if (loading) e.preventDefault();
                }}
              >
                <motion.span
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className={`block w-full rounded-xl py-3 text-center text-sm font-semibold text-white shadow-lg transition-all sm:rounded-2xl sm:py-3.5 ${
                    loading
                      ? "pointer-events-none bg-gray-400"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  Back To Login
                </motion.span>
              </Link>
            </div>

            {/* Footer */}
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="mt-4 text-center text-[10px] text-gray-400 sm:mt-5 sm:text-xs"
            >
              Future of Agriculture &amp; Rural Logistics
            </motion.p>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
