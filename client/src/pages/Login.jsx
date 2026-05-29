import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { motion } from "framer-motion";

import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();

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

    try {
      const response = await api.post("/auth/login", form);

      const token = response.data.token;
      const user = response.data.user; // must include role

      // ✅ store auth data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ role-based redirect
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-black overflow-hidden flex items-center justify-center relative px-6">
      {/* Animated Background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        className="absolute w-[700px] h-[700px] bg-green-500/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="absolute top-20 right-20 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl"
      />

      {/* Main Glass Container */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
        }}
        className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[40px] overflow-hidden shadow-[0_0_60px_rgba(0,255,120,0.15)]"
      >
        {/* LEFT SIDE */}
        <div className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-green-900/40 to-black overflow-hidden">
          {/* Floating Shapes */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 15,
              ease: "linear",
            }}
            className="absolute top-10 left-10 w-32 h-32 border border-green-400/20 rounded-3xl"
          />

          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              repeat: Infinity,
              duration: 18,
              ease: "linear",
            }}
            className="absolute bottom-10 right-10 w-40 h-40 border border-green-300/10 rounded-full"
          />

          {/* Text */}
          <div className="relative z-10">
            <motion.h1
              initial={{
                x: -50,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                duration: 1,
              }}
              className="text-6xl font-black text-white leading-tight"
            >
              Smart
              <br />
              AgriTech
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.6,
              }}
              className="mt-6 text-gray-300 text-sm leading-8 max-w-md"
            >
              AI-powered agriculture ecosystem with intelligent supply chain,
              weather analytics and rural development solutions.
            </motion.p>
          </div>

          {/* Image */}
          <motion.img
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1200&auto=format&fit=crop"
            alt="Agriculture"
            className="relative z-10 w-full h-[320px] object-cover rounded-[30px] mt-10 shadow-2xl"
          />
        </div>

        {/* RIGHT SIDE LOGIN */}
        <div className="flex items-center justify-center p-8 md:p-14">
          <motion.form
            onSubmit={handleSubmit}
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="w-full max-w-sm"
          >
            {/* Logo */}
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="mb-10"
            >
              <h1 className="text-5xl font-black text-white">Login</h1>

              <p className="text-gray-400 text-sm mt-3">
                Access your agriculture dashboard
              </p>
            </motion.div>

            {/* Inputs */}
            <div className="space-y-5">
              <motion.input
                whileFocus={{
                  scale: 1.03,
                }}
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/10 text-white placeholder:text-gray-400 p-4 rounded-2xl outline-none focus:border-green-400 transition-all"
              />

              <motion.input
                whileFocus={{
                  scale: 1.03,
                }}
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/10 text-white placeholder:text-gray-400 p-4 rounded-2xl outline-none focus:border-green-400 transition-all"
              />
            </div>

            {/* Buttons */}
            <div className="space-y-4 mt-8">
              <motion.button
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-2xl transition-all shadow-[0_0_25px_rgba(0,255,120,0.4)]"
              >
                Login
              </motion.button>

              <Link to="/register">
                <motion.button
                  whileHover={{
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  type="button"
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white py-4 rounded-2xl transition-all"
                >
                  Create Account
                </motion.button>
              </Link>
            </div>

            {/* Footer */}
            <motion.p
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="text-center text-xs text-gray-500 mt-10"
            >
              Powered by AI & Smart Rural Innovation
            </motion.p>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
