import { useEffect, useState } from 'react'

import MainLayout from '../layouts/MainLayout'
import ShipmentCard from '../components/ShipmentCard'
import CreateShipmentForm from '../components/CreateShipmentForm'

import api from '../services/api'

const SupplyChain = () => {
    const [shipments, setShipments] = useState([])

    const fetchShipments = async () => {
        try {
            const response = await api.get('/shipments')

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

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {shipments.map((shipment) => (
                    <ShipmentCard
                        key={shipment._id}
                        shipment={shipment}
                        fetchShipments={fetchShipments}
                    />
                ))}
            </div>
        </MainLayout>
    )
}

export default SupplyChain