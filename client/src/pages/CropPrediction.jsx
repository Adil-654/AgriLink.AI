import { useState } from 'react'
import MainLayout from '../layouts/MainLayout'

const CropPrediction = () => {
  const [form, setForm] = useState({
    soilType: '',
    rainfall: '',
    season: '',
  })

  const [result, setResult] = useState(null)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await api.post('/predict/crop', form)

    setResult(response.data)
  }

  return (
    <MainLayout>
      <div className='max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-lg'>
        <h1 className='text-4xl font-bold text-green-700 mb-8'>
          AI Crop Prediction
        </h1>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <input
            type='text'
            placeholder='Enter Soil Type'
            name='soilType'
            onChange={handleChange}
            className='w-full border p-4 rounded-2xl outline-none focus:border-green-600'
          />

          <input
            type='number'
            placeholder='Enter Rainfall'
            name='rainfall'
            onChange={handleChange}
            className='w-full border p-4 rounded-2xl outline-none focus:border-green-600'
          />

          <select
            name='season'
            onChange={handleChange}
            className='w-full border p-4 rounded-2xl outline-none focus:border-green-600'
          >
            <option>Select Season</option>
            <option>Summer</option>
            <option>Winter</option>
            <option>Monsoon</option>
          </select>

          <button className='bg-green-700 hover:bg-green-800 transition text-white w-full py-4 rounded-2xl text-lg font-semibold'>
            Predict Crop
          </button>
        </form>

        {result && (
          <div className='mt-10 bg-green-100 p-8 rounded-3xl'>
            <h2 className='text-3xl font-bold text-green-800'>
              Prediction Result
            </h2>

            <p className='mt-4 text-xl'>
              Recommended Crop: {result.recommendedCrop}
            </p>

            <p className='mt-2 text-lg'>
              Expected Yield: {result.expectedYield}
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default CropPrediction