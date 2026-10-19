
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreateAdmin = () => {
  const navigate = useNavigate();

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

    if (loading) return;

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        "/auth/create-admin",
        {
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response);

      toast.success("Admin Created Successfully 🎉");

      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/admin");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to create admin"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center p-3 sm:p-5">
      {/* Background Glow */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"
      />

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"
      />

      {/* Create Admin Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-8 lg:p-10"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/20 text-2xl">
            👤
          </div>

          <div>
            <h1 className="text-2xl font-black text-white sm:text-3xl">
              Create Admin
            </h1>

            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              Add an administrator to AgriLink AI
            </p>
          </div>
        </div>

        {/* Full Name */}
        <label
          htmlFor="name"
          className="mb-2 block text-sm text-slate-300"
        >
          Full Name
        </label>

        <input
          id="name"
          type="text"
          name="name"
          placeholder="Enter full name"
          value={form.name}
          onChange={handleChange}
          autoComplete="name"
          required
          disabled={loading}
          className="mb-4 w-full rounded-xl border border-white/10 bg-white/10 p-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:rounded-2xl sm:p-3.5"
        />

        {/* Email */}
        <label
          htmlFor="email"
          className="mb-2 block text-sm text-slate-300"
        >
          Email Address
        </label>

        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter email address"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          required
          disabled={loading}
          className="mb-4 w-full rounded-xl border border-white/10 bg-white/10 p-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:rounded-2xl sm:p-3.5"
        />

        {/* Password */}
        <label
          htmlFor="password"
          className="mb-2 block text-sm text-slate-300"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          name="password"
          placeholder="Create password"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
          disabled={loading}
          className="mb-4 w-full rounded-xl border border-white/10 bg-white/10 p-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:rounded-2xl sm:p-3.5"
        />

        {/* Confirm Password */}
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm text-slate-300"
        >
          Confirm Password
        </label>

        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={form.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
          required
          disabled={loading}
          className="mb-5 w-full rounded-xl border border-white/10 bg-white/10 p-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:rounded-2xl sm:p-3.5"
        />

        {/* Submit */}
        <motion.button
          whileHover={!loading ? { scale: 1.02 } : {}}
          whileTap={!loading ? { scale: 0.98 } : {}}
          type="submit"
          disabled={loading}
          className={`w-full rounded-xl py-3.5 font-bold text-white shadow-xl transition-all sm:rounded-2xl ${
            loading
              ? "cursor-not-allowed bg-slate-600"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-indigo-500/20"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Creating Admin...
            </span>
          ) : (
            "➕ Create Admin"
          )}
        </motion.button>

        {/* Back to Admin Home */}
        <motion.button
          type="button"
          onClick={() => navigate("/admin")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-400/40 bg-white/5 py-3.5 font-semibold text-indigo-300 transition-all hover:bg-indigo-500/10 sm:rounded-2xl"
        >
          ← Back to Admin Home
        </motion.button>

        <p className="mt-4 text-center text-xs text-slate-500">
          🔒 Secure Administrator Management
        </p>
      </motion.form>
    </div>
  );
};

export default CreateAdmin;
