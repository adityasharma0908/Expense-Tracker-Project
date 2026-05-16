import {
  PieChart,
  Pie,
  Tooltip
} from "recharts"

function ChartSection() {

  const data = [
    { name: "Food", value: 400 },
    { name: "Shopping", value: 300 },
    { name: "Travel", value: 300 }
  ]

  return (

    <div className="bg-gray-800 p-6 rounded-xl">

      <h2 className="text-white text-2xl mb-4">
        Expense Analytics
      </h2>

      <PieChart width={300} height={300}>

        <Pie
          data={data}
          dataKey="value"
          outerRadius={100}
          fill="#3b82f6"
        />

        <Tooltip />

      </PieChart>

    </div>

  )
}

export default ChartSection