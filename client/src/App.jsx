import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import CropPrediction from './pages/CropPrediction'
import SupplyChain from './pages/SupplyChain'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/' element={<Login />} />

<Route
  path='/register'
  element={<Register />}
/>
<Route
  path='/supply-chain'
  element={<SupplyChain />}
/>
        <Route
          path='/prediction'
          element={<CropPrediction />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App