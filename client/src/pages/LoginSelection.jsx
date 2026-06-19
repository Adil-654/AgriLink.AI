import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTractor,
  FaUserShield,
  FaUserPlus,
  FaArrowRight,
} from "react-icons/fa";

const LoginSelection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 flex items-center justify-center p-6 overflow-hidden relative">
      {/* Floating Background */}

      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute -top-24 -left-24 w-[350px] h-[350px] rounded-full bg-green-400/20 blur-3xl"
      />

      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="absolute -bottom-24 -right-24 w-[350px] h-[350px] rounded-full bg-green-500/20 blur-3xl"
      />

      {/* Main Container */}

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-7xl rounded-[40px] overflow-hidden shadow-2xl bg-white/30 backdrop-blur-2xl border border-white/30 grid lg:grid-cols-2"
      >
        {/* LEFT PANEL */}

        <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-12 flex flex-col justify-between relative overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 40,
              ease: "linear",
            }}
            className="absolute -top-24 -left-24 w-72 h-72 border border-white/10 rounded-full"
          />

          <div>
            <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm border border-white/20">
              🚀 Smart Agriculture Platform
            </span>

            <h1 className="text-7xl font-black text-white mt-8 leading-none">
              AgriLink
              <br />
              AI
            </h1>

            <p className="text-green-100 mt-6 text-lg leading-8 max-w-md">
              AI-powered agriculture ecosystem integrating crop intelligence,
              smart logistics and predictive analytics.
            </p>
          </div>
          {/* Hero Image */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-10"
          >
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop"
              alt="Smart Farming"
              className="w-full h-[340px] object-cover rounded-[30px] shadow-2xl border border-white/10"
            />
          </motion.div>

          {/* Bottom Branding */}

          <motion.div
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="mt-10"
          >
            <div className="w-full h-px bg-white/20 mb-6"></div>

            <p className="text-green-100 text-sm leading-7">
              🌱 Building the Future of Agriculture with Artificial
              Intelligence, Smart Logistics and Digital Innovation.
            </p>
          </motion.div>
        </div>

        {/* ================= RIGHT PANEL ================= */}

        <div className="bg-white/60 backdrop-blur-xl p-10 flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-black text-green-700"
          >
            Choose Login
          </motion.h2>

          <p className="text-gray-500 mt-3 mb-10 text-lg">
            Select your account type to continue.
          </p>

          <div className="space-y-6">
            {" "}
            {/* Farmer Login */}
            <Link to="/farmer-login">
              <motion.div
                whileHover={{
                  scale: 1.02,
                  x: 8,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-[0_20px_50px_rgba(34,197,94,0.25)] transition-all duration-500 border border-green-100 cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center group-hover:bg-green-600 transition-all">
                    <FaTractor className="text-3xl text-green-700 group-hover:text-white transition-all" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-green-700">
                      Farmer Login
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                      Access crop prediction, shipments and dashboard
                    </p>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white group-hover:translate-x-2 transition-all">
                  <FaArrowRight />
                </div>
              </motion.div>
            </Link>
            {/* Admin Login */}
            <Link to="/admin-login">
              <motion.div
                whileHover={{
                  scale: 1.02,
                  x: 8,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-[0_20px_50px_rgba(34,197,94,0.25)] transition-all duration-500 border border-green-100 cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center group-hover:bg-green-600 transition-all">
                    <FaUserShield className="text-3xl text-green-700 group-hover:text-white transition-all" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-green-700">
                      Admin Login
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                      Manage farmers, analytics and platform
                    </p>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white group-hover:translate-x-2 transition-all">
                  <FaArrowRight />
                </div>
              </motion.div>
            </Link>
            {/* OR Divider */}
            <div className="flex items-center py-2">
              <div className="flex-1 h-px bg-gray-300"></div>

              <span className="px-4 text-sm text-gray-400 font-semibold">
                OR
              </span>

              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
            {/* Create Account */}
            <Link to="/register">
              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="group bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-6 shadow-xl hover:shadow-[0_20px_50px_rgba(34,197,94,0.35)] transition-all duration-500 cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                    <FaUserPlus className="text-3xl text-white" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Create Account
                    </h2>

                    <p className="text-green-100 text-sm mt-1">
                      Join AgriLink AI and start your smart farming journey
                    </p>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-full bg-white text-green-700 flex items-center justify-center group-hover:translate-x-2 transition-all">
                  <FaArrowRight />
                </div>
              </motion.div>
            </Link>{" "}
          </div>

          {/* Footer */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1,
              duration: 1,
            }}
            className="mt-10 text-center"
          >
            <p className="text-gray-400 text-sm">
              🌱 AI Powered Agriculture • Rural Logistics • Smart Analytics
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginSelection;
