import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

const ShipmentBarChart = ({ data }) => {
  return (
    <ResponsiveContainer
      width='100%'
      height={300}
    >
      <BarChart data={data}>
        <XAxis dataKey='month' />
        <YAxis />
        <Tooltip />

        <Bar
          dataKey='shipments'
          fill='#6366f1'
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ShipmentBarChart