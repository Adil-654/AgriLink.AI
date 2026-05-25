import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

const data = [
  { month: 'Jan', yield: 25 },
  { month: 'Feb', yield: 40 },
  { month: 'Mar', yield: 35 },
  { month: 'Apr', yield: 60 },
  { month: 'May', yield: 75 },
]
const YieldChart = () => {
  return (
    <div className='bg-white p-6 rounded-3xl shadow-md mt-8'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-green-800'>
          Crop Yield Analytics
        </h2>
      </div>

      <ResponsiveContainer width='100%' height={320}>
        <LineChart data={data}>
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip />

          <Line
            type='monotone'
            dataKey='yield'
            stroke='#16a34a'
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default YieldChart