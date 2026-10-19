
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaUserShield,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";

import api from "../services/api";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
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

    if (loading) return;

    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);

      if (res.data.user?.role !== "admin") {
        toast.error("Only Admin accounts can login here");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Welcome Admin 👋");
      navigate("/admin");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid Admin Credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-2 sm:p-4 flex items-center justify-center">
      {/* Floating Glow */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"
      />

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"
      />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 grid h-full max-h-[850px] w-full max-w-7xl grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl sm:rounded-3xl lg:grid-cols-2"
      >
        {/* LEFT PANEL */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-7 lg:flex xl:p-10">
          {/* Animated Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 40,
              ease: "linear",
            }}
            className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full border border-white/10"
          />

          {/* Branding */}
          <div className="relative z-10">
            <span className="inline-block rounded-full border border-indigo-400/20 bg-indigo-500/20 px-4 py-2 text-xs text-indigo-200 xl:text-sm">
              🔐 Enterprise Control Panel
            </span>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-6 text-5xl font-black leading-tight text-white xl:text-6xl"
            >
              AgriLink
              <br />
              Admin
            </motion.h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300 xl:text-base xl:leading-7">
              Securely manage farmers, shipments, analytics and
              AI-powered agricultural operations from one intelligent
              platform.
            </p>
          </div>

          {/* Hero Image */}
          <motion.img
            animate={{ y: [0, -6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
            alt="Admin control center"
            className="relative z-10 my-4 h-[min(34vh,280px)] w-full rounded-2xl border border-white/10 object-cover shadow-2xl xl:rounded-3xl"
          />

          {/* Footer */}
          <div className="relative z-10">
            <div className="mb-4 h-px w-full bg-white/10" />

            <p className="text-xs text-slate-400 xl:text-sm">
              🔒 Secure • Intelligent • Enterprise Grade
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex min-h-0 items-center justify-center overflow-hidden bg-white/[0.02] p-4 sm:p-7 lg:p-8 xl:p-10">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex w-full max-w-md flex-col"
          >
            {/* Heading */}
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/20 text-2xl text-indigo-300 sm:h-14 sm:w-14">
                <FaUserShield />
              </div>

              <div>
                <h2 className="text-3xl font-black text-white sm:text-4xl">
                  Admin Login
                </h2>

                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  Access the AgriLink Control Center
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="mb-3 sm:mb-4">
              <label
                htmlFor="admin-email"
                className="mb-2 block text-xs font-medium text-slate-300 sm:text-sm"
              >
                Admin Email
              </label>

              <input
                id="admin-email"
                type="email"
                name="email"
                placeholder="Enter admin email"
                autoComplete="username"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-white/10 p-3 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:rounded-2xl sm:p-3.5"
                required
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div className="mb-3 sm:mb-4">
              <label
                htmlFor="admin-password"
                className="mb-2 block text-xs font-medium text-slate-300 sm:text-sm"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-white/10 p-3 pr-12 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:rounded-2xl sm:p-3.5 sm:pr-12"
                  required
                  disabled={loading}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="mb-5 flex items-center justify-between gap-2 sm:mb-6">
              <label className="flex items-center gap-2 text-xs text-slate-300 sm:text-sm">
                <input
                  type="checkbox"
                  className="accent-indigo-500"
                />
                Remember Me
              </label>

              <span className="cursor-default text-xs text-indigo-400 sm:text-sm">
                Admin Access
              </span>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              type="submit"
              disabled={loading}
              className={`w-full rounded-xl py-3 text-sm font-bold text-white shadow-xl transition-all sm:rounded-2xl sm:py-3.5 ${
                loading
                  ? "cursor-not-allowed bg-slate-600"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-[0_0_25px_rgba(99,102,241,0.35)]"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing In...
                </span>
              ) : (
                "🔐 Login as Admin"
              )}
            </motion.button>

            {/* Divider */}
            <div className="my-5 flex items-center sm:my-6">
              <div className="h-px flex-1 bg-white/10" />
              <span className="px-4 text-xs text-slate-500 sm:text-sm">
                OR
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Back Link */}
            <Link to="/" className="block">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-indigo-500/60 py-3 text-sm text-indigo-300 transition-all hover:bg-indigo-500/10 sm:rounded-2xl sm:py-3.5"
              >
                <FaArrowLeft />
                Back to Login Selection
              </motion.span>
            </Link>

            {/* Footer */}
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="mt-5 text-center text-[10px] text-slate-500 sm:mt-6 sm:text-xs"
            >
              🔒 Enterprise Security • AI Powered • AgriLink Admin
            </motion.p>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
