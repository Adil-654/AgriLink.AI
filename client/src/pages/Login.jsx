import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();

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

    try {
      const response = await api.post("/auth/login", form);

      const token = response.data.token;
      const user = response.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Invalid email or password"
      );

      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden flex items-center justify-center relative px-6">

      {/* 🚨 ERROR POPUP */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="fixed top-6 right-6 bg-red-500 text-white px-6 py-4 rounded-2xl shadow-xl z-50"
          >
            ❌ {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACKGROUND ANIMATION */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ repeat: Infinity, duration: 20 }}
        className="absolute w-[700px] h-[700px] bg-green-500/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-20 right-20 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl"
      />

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[40px] overflow-hidden shadow-[0_0_60px_rgba(0,255,120,0.15)]"
      >

        {/* ================= LEFT SIDE (RESTORED IMAGE) ================= */}
        <div className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-green-900/40 to-black overflow-hidden">

          {/* Floating shapes */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="absolute top-10 left-10 w-32 h-32 border border-green-400/20 rounded-3xl"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            className="absolute bottom-10 right-10 w-40 h-40 border border-green-300/10 rounded-full"
          />

          {/* TEXT */}
          <div className="relative z-10">
            <h1 className="text-6xl font-black text-white leading-tight">
              Smart
              <br />
              AgriTech
            </h1>

            <p className="mt-6 text-gray-300 text-sm leading-8 max-w-md">
              AI-powered agriculture ecosystem with intelligent supply chain,
              weather analytics and rural development solutions.
            </p>
          </div>

          {/* IMAGE (FIXED) */}
          <motion.img
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1200&auto=format&fit=crop"
            alt="Agriculture"
            className="relative z-10 w-full h-[320px] object-cover rounded-[30px] mt-10 shadow-2xl"
          />
        </div>

        {/* ================= RIGHT SIDE LOGIN ================= */}
        <div className="flex items-center justify-center p-8 md:p-14">

          <form onSubmit={handleSubmit} className="w-full max-w-sm">

            <h1 className="text-5xl font-black text-white mb-10">
              Login
            </h1>

            <div className="space-y-5">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/10 text-white p-4 rounded-2xl outline-none"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/10 text-white p-4 rounded-2xl outline-none"
              />
            </div>

            <button className="w-full mt-8 bg-green-500 text-black font-bold py-4 rounded-2xl">
              Login
            </button>

            <Link to="/register">
              <button
                type="button"
                className="w-full mt-4 bg-white/10 text-white py-4 rounded-2xl"
              >
                Create Account
              </button>
            </Link>

          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;