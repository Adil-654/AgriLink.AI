import { useState } from 'react'
import api from '../services/api'

const CreateShipmentForm = ({ fetchShipments }) => {
  const [form, setForm] = useState({
    crop: '',
    quantity: '',
    farmerName: '',
    destination: '',
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await api.post('/shipments/create', form)

    fetchShipments()

    setForm({
      crop: '',
      quantity: '',
      farmerName: '',
      destination: '',
    })
  }

  return (
    <div className='bg-white rounded-3xl p-8 shadow-md mb-8'>
      <h2 className='text-3xl font-bold text-green-700 mb-8'>
        Create Shipment
      </h2>

      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-2 gap-6'
      >
        <input
          type='text'
          name='crop'
          placeholder='Crop Name'
          value={form.crop}
          onChange={handleChange}
          className='border p-4 rounded-2xl'
        />

        <input
          type='number'
          name='quantity'
          placeholder='Quantity'
          value={form.quantity}
          onChange={handleChange}
          className='border p-4 rounded-2xl'
        />

        <input
          type='text'
          name='farmerName'
          placeholder='Farmer Name'
          value={form.farmerName}
          onChange={handleChange}
          className='border p-4 rounded-2xl'
        />

        <input
          type='text'
          name='destination'
          placeholder='Destination'
          value={form.destination}
          onChange={handleChange}
          className='border p-4 rounded-2xl'
        />

        <button className='bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl col-span-1 md:col-span-2'>
          Create Shipment
        </button>
      </form>
    </div>
  )
}

export default CreateShipmentForm