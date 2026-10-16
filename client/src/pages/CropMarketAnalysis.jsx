import MainLayout from '../layouts/MainLayout'
import { useState } from 'react'

const CropMarketAnalysis = () => {
  const [crop, setCrop] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    if (!crop.trim()) {
      setError('Please enter a crop name')
      return
    }

    try {
      setLoading(true)
      setError('')
      setResult(null)

const res = await fetch("http://localhost:5000/api/market/crop-analysis", {
            method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ crop }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        return
      }

      setResult(data)
    } catch (err) {
      console.log(err)
      setError('Server error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-8 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">

        {/* HEADER */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
          <h1 className="text-3xl font-bold">
            🌾 Crop Market Analysis AI
          </h1>

          <p className="text-slate-400 mt-2">
            AI predicts historical trends, future prices & investment insights
          </p>
        </div>

        {/* INPUT BOX */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
          <input
            type="text"
            placeholder="Enter crop name (Wheat, Rice, Cotton...)"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-4 bg-green-600 hover:bg-green-700 disabled:opacity-50 px-6 py-3 rounded-xl font-semibold"
          >
            {loading ? 'Analyzing AI...' : 'Analyze Crop'}
          </button>

          {error && (
            <p className="text-red-400 mt-3">{error}</p>
          )}
        </div>

        {/* RESULT SECTION */}
        {result && (
          <div className="grid md:grid-cols-2 gap-6">

            {/* INFO CARD */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
              <h2 className="text-2xl font-bold mb-4">
                📊 AI Analysis Result
              </h2>

              <p><b>Crop:</b> {result.crop}</p>

              <p className="text-green-400 mt-2 font-semibold">
                <b>Trend:</b> {result.trend}
              </p>

              <p className="mt-2">
                <b>Growth:</b> {result.growth_percent}%
              </p>

              <p className="mt-2">
                <b>Volatility:</b> ₹{result.volatility}
              </p>

              <p className="mt-4 text-yellow-300">
                💡 {result.suggestion}
              </p>
            </div>

            {/* HISTORICAL */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
              <h2 className="text-xl font-bold mb-4">
                📉 Historical Prices
              </h2>

              {result.historical?.map((item) => (
                <div
                  key={item.year}
                  className="flex justify-between border-b border-slate-700 py-2"
                >
                  <span>{item.year}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>

            {/* FUTURE */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl md:col-span-2">
              <h2 className="text-xl font-bold mb-4">
                🚀 Future Prediction
              </h2>

              <div className="grid md:grid-cols-5 gap-4">
                {result.future?.map((item) => (
                  <div
                    key={item.year}
                    className="bg-slate-900 p-4 rounded-xl text-center"
                  >
                    <p className="text-slate-400">{item.year}</p>
                    <p className="text-green-400 font-bold">
                      ₹{item.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default CropMarketAnalysis