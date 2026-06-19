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

    setLoading(true);

    try {
      const response = await api.post("/auth/login", form);

      if (response.data.user.role !== "farmer") {
        toast.error("❌ Only Farmer accounts can login here");
        setLoading(false);
        return;
      }

      const token = response.data.token;
      const user = response.data.user;

      if (user.role !== "farmer") {
        toast.error("❌ Only Farmer accounts can login here");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome to AgriLink AI 🌱",
        timer: 1500,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#ffffff",
      });

      setLoading(false);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setLoading(false);

      setError(err?.response?.data?.message || "Invalid email or password");

      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] overflow-hidden flex items-center justify-center relative px-6">
      {/* Error Popup */}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="fixed top-6 right-6 bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl z-50"
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
        transition={{
          repeat: Infinity,
          duration: 20,
        }}
        className="absolute w-[700px] h-[700px] bg-green-500/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, -40, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="absolute top-10 left-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, 40, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
        }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
        }}
        className="absolute bottom-20 left-20 w-80 h-80 bg-green-400/10 rounded-full blur-3xl"
      />

      {/* Main Card */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        whileHover={{
          scale: 1.01,
        }}
        transition={{
          duration: 0.7,
        }}
        className="relative z-10 w-full max-w-7xl grid lg:grid-cols-2 bg-white/10 backdrop-blur-3xl border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_70px_rgba(34,197,94,0.15)]"
      >
        {/* ================= LEFT SIDE ================= */}

        <div className="hidden lg:flex relative flex-col justify-between p-12 bg-gradient-to-br from-green-950/40 via-black to-green-900/30 overflow-hidden">
          {/* Floating Shapes */}

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
            className="absolute top-8 left-8 w-36 h-36 border border-green-400/20 rounded-full"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
            className="absolute bottom-10 right-10 w-44 h-44 border border-green-300/10 rounded-3xl"
          />

          {/* Logo & Heading */}

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-full text-green-300 text-xs font-semibold mb-6">
              🚀 Smart Agriculture Platform
            </div>

            <h1 className="text-6xl font-black leading-tight bg-gradient-to-r from-green-300 via-green-400 to-emerald-500 bg-clip-text text-transparent">
              AgriLink
              <br />
              AI
            </h1>

            <p className="mt-6 text-gray-300 text-sm leading-8 max-w-md">
              AI-powered agriculture ecosystem integrating crop intelligence,
              smart logistics, predictive analytics and digital farmer
              management.
            </p>

            {/* Feature Chips */}

            <div className="flex flex-wrap gap-3 mt-8">
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

          {/* Floating Image */}

          <motion.img
            animate={{
              y: [0, -12, 0],
              scale: [1, 1.02, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop"
            alt="Agriculture"
            className="relative z-10 w-full h-[320px] object-cover rounded-[30px] mt-10 shadow-[0_25px_60px_rgba(34,197,94,0.35)]"
          />

          {/* Statistics */}

          <div className="grid grid-cols-3 gap-4 mt-8 relative z-10">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-400">500+</h2>

              <p className="text-xs text-gray-400">Farmers</p>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-400">98%</h2>

              <p className="text-xs text-gray-400">AI Accuracy</p>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-400">24/7</h2>

              <p className="text-xs text-gray-400">Support</p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE LOGIN ================= */}

        <div className="flex items-center justify-center p-8 md:p-14">
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <motion.h1
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="text-5xl font-black bg-gradient-to-r from-green-400 via-green-500 to-emerald-400 bg-clip-text text-transparent"
            >
              Login
            </motion.h1>

            <p className="text-gray-400 mt-2 mb-8">
              Access your AgriLink AI dashboard
            </p>

            <div className="space-y-5">
              <motion.input
                whileFocus={{
                  scale: 1.02,
                }}
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/10 text-white placeholder-gray-400 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/30 focus:border-green-500 transition-all duration-300"
              />

              <div className="relative">
                <motion.input
                  whileFocus={{
                    scale: 1.02,
                  }}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/10 text-white placeholder-gray-400 p-4 pr-12 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/30 focus:border-green-500 transition-all duration-300"
                />

                <button
                  type="button"
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
              whileHover={!loading ? { scale: 1.03 } : {}}
              whileTap={!loading ? { scale: 0.95 } : {}}
              className="w-full mt-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-[0_0_35px_rgba(34,197,94,0.45)] transition-all duration-300 text-black font-bold py-4 rounded-2xl"
            >
              {loading ? "Signing In..." : "🚀 Login"}
            </motion.button>

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-white/10"></div>

              <span className="px-3 text-xs text-gray-400">OR</span>

              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            <Link to="/register">
              <motion.button
                type="button"
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="w-full bg-white/5 border border-green-500/30 hover:bg-green-500/10 hover:border-green-500 transition-all duration-300 text-white py-4 rounded-2xl"
              >
                Create Account
              </motion.button>
            </Link>

            <motion.p
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="text-center text-xs text-gray-500 mt-8"
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
