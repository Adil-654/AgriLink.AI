import { BrowserRouter, Routes, Route } from "react-router-dom";

import FarmerLogin from "./pages/Farmerlogin";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";

import CreateAdmin from "./pages/CreateAdmin";
import Weather from "./pages/Weather";
import Dashboard from "./pages/Dashboard";
import CropPrediction from "./pages/CropPrediction";
import SupplyChain from "./pages/SupplyChain";
import Analytics from "./pages/Analytics";
import LoginSelection from "./pages/LoginSelection";

import AdminDashboard from "./pages/AdminDashboard";
import AdminFarmers from "./pages/AdminFarmers";
import AdminShipments from "./pages/AdminShipments";
import AdminAnalytics from "./pages/AdminAnalytics"; // ✅ ADD THIS
import CropMarketAnalysis from "./pages/CropMarketAnalysis"
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        import Weather from "./pages/Weather";
        <Route
          path="/weather"
          element={
            <ProtectedRoute>
              <Weather />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-admin"
          element={
            <ProtectedRoute role="admin">
              <CreateAdmin />
            </ProtectedRoute>
          }
        />
        <Route path="/admin-login" element={<AdminLogin />} />
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<LoginSelection />} />
        <Route path="/farmer-login" element={<FarmerLogin />} />
        <Route path="/register" element={<Register />} />
        {/* ================= FARMER ROUTES ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="farmer">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supply-chain"
          element={
            <ProtectedRoute role="farmer">
              <SupplyChain />
            </ProtectedRoute>
          }
        />
<<<<<<< HEAD
=======
<Route
  path="/market-analysis"
  element={
    <ProtectedRoute role="farmer">
      <CropMarketAnalysis />
    </ProtectedRoute>
  }
/>
>>>>>>> 695f543 (gsap)
        <Route
          path="/prediction"
          element={
            <ProtectedRoute role="farmer">
              <CropPrediction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute role="farmer">
              <Analytics />
            </ProtectedRoute>
          }
        />
        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/farmers"
          element={
            <ProtectedRoute role="admin">
              <AdminFarmers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/shipments"
          element={
            <ProtectedRoute role="admin">
              <AdminShipments />
            </ProtectedRoute>
          }
        />
        {/* ✅ ADMIN ANALYTICS (FIXED) */}
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute role="admin">
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
