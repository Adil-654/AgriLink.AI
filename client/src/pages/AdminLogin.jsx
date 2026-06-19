import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { FaUserShield, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";

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

    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);

      if (res.data.user.role !== "admin") {
        toast.error("❌ Only Admin accounts can login here");
        setLoading(false);
        return;
      }

      if (res.data.user.role !== "admin") {
        toast.error("Access Denied! Admin account required.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Welcome Admin 👋");

      navigate("/admin");
    } catch (err) {
      toast.error("Invalid Admin Credentials");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center p-6 overflow-hidden relative">
      {/* Floating Glow */}

      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl top-0 left-0"
      />

      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="absolute w-96 h-96 rounded-full bg-purple-500/20 blur-3xl bottom-0 right-0"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl rounded-[40px] overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl grid lg:grid-cols-2"
      >
        {/* ================= LEFT PANEL ================= */}

        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Animated Ring */}

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 40,
              ease: "linear",
            }}
            className="absolute -top-20 -left-20 w-72 h-72 rounded-full border border-white/10"
          />

          {/* Branding */}

          <div>
            <span className="inline-block px-5 py-2 rounded-full bg-indigo-500/20 border border-indigo-400/20 text-indigo-200 text-sm">
              🔐 Enterprise Control Panel
            </span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-7xl font-black text-white mt-8 leading-none"
            >
              AgriLink
              <br />
              Admin
            </motion.h1>

            <p className="text-slate-300 text-lg leading-8 mt-6 max-w-md">
              Securely manage farmers, shipments, analytics and AI-powered
              agricultural operations from one intelligent platform.
            </p>
          </div>

          {/* Hero Image */}

          <motion.img
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
            alt="Admin"
            className="w-full h-[330px] object-cover rounded-[30px] mt-10 shadow-2xl border border-white/10"
          />

          {/* Footer */}

          <motion.div
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="mt-8"
          >
            <div className="w-full h-px bg-white/10 mb-5"></div>

            <p className="text-slate-400 text-sm">
              🔒 Secure • Intelligent • Enterprise Grade
            </p>
          </motion.div>
        </div>

        {/* ================= RIGHT PANEL ================= */}

        <div className="bg-white/5 backdrop-blur-xl flex items-center justify-center p-12">
          <motion.form
            onSubmit={handleSubmit}
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="w-full max-w-md"
          >
            <h2 className="text-5xl font-black text-white">Admin Login</h2>
            <p className="text-slate-400 mt-3 mb-8">
              Access the AgriLink Control Center
            </p>{" "}
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/10 text-white placeholder:text-slate-400 p-4 rounded-2xl outline-none mb-5 focus:border-indigo-500 transition-all"
              required
            />
            {/* Password */}
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/10 text-white placeholder:text-slate-400 p-4 pr-14 rounded-2xl outline-none focus:border-indigo-500 transition-all"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {/* Remember */}
            <div className="flex justify-between items-center mb-8">
              <label className="flex items-center gap-2 text-slate-300 text-sm">
                <input type="checkbox" />
                Remember Me
              </label>

              <span className="text-indigo-400 text-sm cursor-pointer hover:text-indigo-300">
                Forgot Password?
              </span>
            </div>
            {/* Login Button */}
            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-xl hover:shadow-[0_0_35px_rgba(99,102,241,0.6)] transition-all"
            >
              {loading ? "Signing In..." : "🔐 Login"}
            </motion.button>
            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 h-px bg-white/10"></div>

              <span className="px-4 text-slate-500 text-sm">OR</span>

              <div className="flex-1 h-px bg-white/10"></div>
            </div>
            <Link to="/">
              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                className="w-full border border-indigo-500 text-indigo-300 rounded-2xl py-4 flex justify-center items-center gap-3 hover:bg-indigo-500/10 transition-all cursor-pointer"
              >
                <FaArrowLeft />
                Back to Login Selection
              </motion.div>
            </Link>
            {/* Footer */}
            <motion.p
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="text-center text-slate-500 text-sm mt-10"
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
