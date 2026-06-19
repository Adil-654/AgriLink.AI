import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

import { motion } from "framer-motion";

import { FaRobot, FaLeaf, FaTruck, FaEye, FaEyeSlash } from "react-icons/fa";

import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.post("/auth/register", form);

      Swal.fire({
        icon: "success",
        title: "Welcome to AgriLink AI 🌱",
        text: "Your account has been created successfully!",
        background: "#f0fdf4",
        color: "#166534",
        confirmButtonColor: "#16a34a",
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      });
      setLoading(true);

      navigate("/");
    } catch (err) {
      setLoading(false);
      if (err.response?.status === 400) {
        Swal.fire({
          icon: "warning",
          title: "Account Already Exists",
          text: "Please login or use another email.",
          confirmButtonColor: "#f59e0b",
        });
      } else if (err.response?.status === 500) {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Something went wrong. Please try again.",
          confirmButtonColor: "#dc2626",
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Network Issue",
          text: "Please check your internet connection.",
          confirmButtonColor: "#2563eb",
        });
      }

      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 flex items-center justify-center px-6 overflow-hidden relative">
      {/* Floating Background */}
      <motion.div
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="absolute top-0 left-0 w-96 h-96 bg-green-300 opacity-20 blur-3xl rounded-full"
      />

      <motion.div
        animate={{
          y: [0, 30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 opacity-20 blur-3xl rounded-full"
      />

      {/* Main Container */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="relative z-10 w-full max-w-6xl bg-white/40 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-[40px] overflow-hidden grid lg:grid-cols-2"
      >
        {/* LEFT SIDE IMAGE */}
        {/* LEFT SIDE IMAGE */}
        <div className="hidden lg:flex relative items-center justify-center bg-gradient-to-br from-green-700 to-green-500 p-14 overflow-hidden">
          {/* Animated Ring */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
            className="absolute w-[420px] h-[420px] border border-white/10 rounded-full"
          />

          {/* Image Container */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: {
                duration: 1,
              },
              y: {
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              },
            }}
            className="relative z-10 flex flex-col items-center"
          >
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop"
              alt="Farmer"
              className="w-[340px] h-[420px] object-cover rounded-[32px] shadow-[0_25px_50px_rgba(34,197,94,0.35)] transition-all duration-500 hover:scale-105"
            />

            {/* Text */}
            <div className="mt-8 text-center text-white max-w-sm">
              <h1 className="text-4xl font-black leading-tight">
                Smart Farming
              </h1>

              <p className="mt-4 text-sm text-green-100 leading-7">
                AI-powered agriculture and smart logistics platform helping
                farmers manage crops and deliveries efficiently.
              </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="flex justify-center items-center p-6 md:p-12">
          <motion.form
            onSubmit={handleSubmit}
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="w-full max-w-sm"
          >
            {/* Logo */}

            <div className="flex items-center justify-center gap-3 mb-3">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
                className="text-4xl"
              >
                🌱
              </motion.div>

              <motion.h1
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
                className="text-4xl font-black bg-gradient-to-r from-green-600 via-green-700 to-green-500 bg-clip-text text-transparent"
              >
                AgriLink AI
              </motion.h1>
            </div>

            <p className="text-center text-gray-500 text-sm mb-8">
              🌾 AI-Powered Smart Agriculture Platform
            </p>

            {/* Inputs */}
            <div className="space-y-4">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full bg-white/70 border border-gray-200 p-4 rounded-2xl outline-none text-sm focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all shadow-sm"
              />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full bg-white/70 border border-gray-200 p-4 rounded-2xl outline-none text-sm focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all shadow-sm"
              />
              <div className="relative">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full bg-white/70 border border-gray-200 p-4 rounded-2xl outline-none text-sm focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all shadow-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 py-3">
              <motion.div
                whileHover={{
                  y: -10,
                  scale: 1.08,
                  rotate: -2,
                }}
                transition={{ duration: 0.3 }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 shadow-lg hover:shadow-2xl cursor-pointer border border-green-100"
              >
                <FaRobot className="mx-auto text-3xl text-green-600" />

                <p className="text-xs font-bold text-center mt-3 text-gray-700">
                  AI Prediction
                </p>
              </motion.div>

              <motion.div
                whileHover={{
                  y: -10,
                  scale: 1.08,
                  rotate: 2,
                }}
                transition={{ duration: 0.3 }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 shadow-lg hover:shadow-2xl cursor-pointer border border-green-100"
              >
                <FaLeaf className="mx-auto text-3xl text-green-600" />

                <p className="text-xs font-bold text-center mt-3 text-gray-700">
                  Smart Farming
                </p>
              </motion.div>

              <motion.div
                whileHover={{
                  y: -10,
                  scale: 1.08,
                  rotate: -2,
                }}
                transition={{ duration: 0.3 }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 shadow-lg hover:shadow-2xl cursor-pointer border border-green-100"
              >
                <FaTruck className="mx-auto text-3xl text-green-600" />

                <p className="text-xs font-bold text-center mt-3 text-gray-700">
                  Logistics
                </p>
              </motion.div>
            </div>

            {/* Buttons */}
            <div className="space-y-4 mt-8">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.03 } : {}}
                whileTap={!loading ? { scale: 0.95 } : {}}
                className={`w-full py-4 rounded-2xl text-sm font-semibold shadow-xl transition-all text-white ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  "🚀 Create Account"
                )}
              </motion.button>

              <Link to="/">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  type="button"
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl text-sm font-semibold shadow-xl transition-all"
                >
                  Back To Login
                </motion.button>
              </Link>
            </div>
            {/* Footer */}
            <motion.p
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="text-xs text-center text-gray-400 mt-8"
            >
              Future of Agriculture & Rural Logistics
            </motion.p>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
