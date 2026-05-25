import { Truck } from 'lucide-react'
import api from '../services/api'

const ShipmentCard = ({
  shipment,
  fetchShipments,
}) => {
  const updateStatus = async (status) => {
    try {
      await api.put(
        `/shipments/${shipment._id}`,
        { status }
      )

      fetchShipments()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all'>
      <div className='flex justify-between items-start'>
        <div>
          <div className='flex items-center gap-3'>
            <Truck className='text-green-700' />

            <h2 className='text-2xl font-bold text-green-700'>
              {shipment.crop}
            </h2>
          </div>

          <p className='text-gray-500 mt-4'>
            Farmer: {shipment.farmerName}
          </p>

          <p className='text-gray-500'>
            Destination: {shipment.destination}
          </p>

          <p className='text-gray-500'>
            Quantity: {shipment.quantity} KG
          </p>
        </div>

        <div className='flex flex-col gap-4'>
          <span
            className={`
              px-5 py-2 rounded-full text-white font-semibold text-sm text-center
              ${
                shipment.status === 'Delivered'
                  ? 'bg-green-600'
                  : shipment.status === 'In Transit'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }
            `}
          >
            {shipment.status}
          </span>

          <select
            onChange={(e) =>
              updateStatus(e.target.value)
            }
            value={shipment.status}
            className='border p-3 rounded-xl'
          >
            <option>Pending</option>
            <option>In Transit</option>
            <option>Delivered</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default ShipmentCard