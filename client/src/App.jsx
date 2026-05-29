import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import CropPrediction from "./pages/CropPrediction";
import SupplyChain from "./pages/SupplyChain";
import Analytics from "./pages/Analytics";

import AdminDashboard from "./pages/AdminDashboard";
import AdminFarmers from "./pages/AdminFarmers";
import AdminShipments from "./pages/AdminShipments";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Login />} />
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

        {/* ================= ADMIN ROUTES (NESTED) ================= */}
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

        {/* <Route
          path='/admin/analytics'
          element={
            <ProtectedRoute role="admin">
              <AdminAnalytics />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
