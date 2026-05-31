import { Truck } from 'lucide-react'

const ShipmentCard = ({ shipment }) => {
  return (
    <div className='bg-white rounded-3xl p-6 shadow-md'>
      <div className='flex justify-between items-start'>
        <div>
          <div className='flex items-center gap-3'>
            <Truck className='text-green-700' />

            <h2 className='text-2xl font-bold text-green-700'>
              {shipment.crop}
            </h2>
          </div>

          <p className='text-gray-500 mt-4'>
            Destination: {shipment.destination}
          </p>

          <p className='text-gray-500'>
            Quantity: {shipment.quantity} KG
          </p>

          <p className='text-gray-500'>
            Price: ₹{shipment.pricePerKg || 0}/KG
          </p>

          <p className='text-green-700 font-semibold'>
            Estimated Revenue: ₹{shipment.revenue || 0}
          </p>

          <p className='text-gray-500'>
            Created:{' '}
            {new Date(shipment.createdAt).toLocaleDateString()}
          </p>
        </div>

        <span
          className={`
            px-5 py-2 rounded-full text-white font-semibold text-sm
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
      </div>
    </div>
  )
}

export default ShipmentCard