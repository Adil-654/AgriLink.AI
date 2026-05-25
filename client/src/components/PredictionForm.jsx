import { useState } from 'react'
import api from '../services/api'

const PredictionForm = () => {
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await api.post('/predict/crop', {
      soilType: 'Black Soil',
      rainfall: 250,
      season: 'Monsoon',
    })

    setResult(response.data)
  }

  return (
    <div>
      <button
        onClick={handleSubmit}
        className='bg-green-600 text-white px-6 py-2 rounded-lg'
      >
        Predict Crop
      </button>

      {result && (
        <div className='mt-4'>
          <p>Recommended Crop: {result.recommendedCrop}</p>
          <p>Expected Yield: {result.expectedYield}</p>
        </div>
      )}
    </div>
  )
}

export default PredictionForm