import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../services/api";

const CreateAdmin = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        "/auth/create-admin",
        {
          name: form.name,
          email: form.email,
          password: form.password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log(response);

      toast.success("Admin Created Successfully 🎉");

      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error("Failed to create admin");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center p-8">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl"
      >
        <h1 className="text-4xl font-black text-white mb-2">Create Admin</h1>

        <p className="text-slate-400 mb-8">
          Add a new administrator to AgriLink AI
        </p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-4 mb-4 rounded-2xl bg-white/10 text-white outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-4 mb-4 rounded-2xl bg-white/10 text-white outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-4 mb-4 rounded-2xl bg-white/10 text-white outline-none"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full p-4 mb-6 rounded-2xl bg-white/10 text-white outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold"
        >
          {loading ? "Creating..." : "Create Admin"}
        </button>
      </motion.form>
    </div>
  );
};

export default CreateAdmin;
