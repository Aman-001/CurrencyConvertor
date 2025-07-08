import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

// 🔽 You can paste this inside the same file
function getTrendData(from, to) {
  const key = `${from.toLowerCase()}_${to.toLowerCase()}`
  
  // Custom trends for popular currency pairs
  const dummyData = {
    usd_inr: [83.1, 83.3, 83.0, 83.2, 83.4, 83.6, 83.5],
    eur_inr: [89.2, 89.4, 89.1, 89.0, 89.6, 89.3, 89.5],
    usd_eur: [0.91, 0.92, 0.90, 0.89, 0.91, 0.90, 0.92],
    eur_usd: [1.09, 1.08, 1.10, 1.11, 1.10, 1.09, 1.08],
    usd_jpy: [155.1, 155.5, 155.0, 154.8, 155.2, 155.4, 155.6],
    gbp_usd: [1.28, 1.27, 1.29, 1.28, 1.30, 1.29, 1.31]
  }

  if (dummyData[key]) return dummyData[key]

  // Generate a smooth random trend for all other pairs
  const base = Math.random() * (100 - 0.5) + 0.5
  return Array.from({ length: 7 }, (_, i) =>
    Number((base + i * 0.02 + Math.random() * 0.05).toFixed(2))
  )
}

function ExchangeRateChart({ from, to }) {
  const labels = ['June 28', 'June 29', 'June 30', 'July 1', 'July 2', 'July 3', 'July 4']
  const values = getTrendData(from, to)

  const chartData = {
    labels,
    datasets: [
      {
        label: `Exchange Rate (${from.toUpperCase()} → ${to.toUpperCase()})`,
        data: values,
        fill: true,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  }

  return (
    <div className="max-w-xl mx-auto mt-6 px-4 py-6 bg-white/30 backdrop-blur-md rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-4 text-center">
        {from.toUpperCase()} → {to.toUpperCase()} (Demo Trend)
      </h3>
      <Line data={chartData} />
    </div>
  )
}

export default ExchangeRateChart
