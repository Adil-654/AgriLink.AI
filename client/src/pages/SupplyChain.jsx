import { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import ShipmentCard from '../components/ShipmentCard'
import CreateShipmentForm from '../components/CreateShipmentForm'
import api from '../services/api'

const SupplyChain = () => {
  const [shipments, setShipments] = useState([])

  const fetchShipments = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem('user')
      )

      const response = await api.get(
        `/shipments/my/${user.name}`
      )

      setShipments(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchShipments()
  }, [])

  return (
    <MainLayout>
      <CreateShipmentForm
        fetchShipments={fetchShipments}
      />

      <div className='mb-6'>
        <h2 className='text-3xl font-bold text-green-700'>
          Shipment History
        </h2>

        <p className='text-gray-500 mt-2'>
          Track all your crop shipments and
          view status updates from admin.
        </p>
      </div>

      {shipments.length === 0 ? (
        <div className='bg-white rounded-3xl p-10 text-center shadow-md'>
          <h3 className='text-xl font-semibold text-gray-700'>
            No Shipments Found
          </h3>

          <p className='text-gray-500 mt-2'>
            Create your first shipment above.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {shipments.map((shipment) => (
            <ShipmentCard
              key={shipment._id}
              shipment={shipment}
            />
          ))}
        </div>
      )}
    </MainLayout>
  )
}

export default SupplyChain