import { useEffect, useState } from 'react'
import { InputBox, ExchangeRateChart } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("conversionHistory")
    return saved ? JSON.parse(saved) : []
  })

  // Save history to localStorage when it updates
  useEffect(() => {
    localStorage.setItem("conversionHistory", JSON.stringify(history))
  }, [history])

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    const result = amount * currencyInfo[to]
    setConvertedAmount(result)

    const newEntry = {
      id: Date.now(),
      from,
      to,
      amount,
      result: result.toFixed(2)
    }

    setHistory((prev) => [newEntry, ...prev.slice(0, 4)]) // keep max 5 entries
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-no-repeat relative px-4 py-12">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <div className="w-full max-w-md mx-auto border border-gray-200 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            convert()
          }}
        >
          <div className="mb-1">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(val) => setAmount(val)}
            />
          </div>

          <div className="relative w-full h-0.5 my-2">
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-3 py-1 text-sm"
              onClick={swap}
            >
              Swap
            </button>
          </div>

          <div className="mt-1 mb-4">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition duration-300"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>

        {/* Chart Component */}
        <ExchangeRateChart from={from} to={to} />

        {/* Conversion History */}
        {history.length > 0 && (
          <div className="mt-6 bg-white/30 backdrop-blur-md p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-md font-semibold text-white">Recent Conversions</h3>
              <button
                onClick={() => {
                  setHistory([])
                  localStorage.removeItem("conversionHistory")
                }}
                className="text-xs text-red-300 hover:text-red-500 underline"
              >
                Clear
              </button>
            </div>
            <ul className="text-white text-sm space-y-1">
              {history.map((item) => (
                <li key={item.id}>
                  {item.amount} {item.from.toUpperCase()} → {item.result} {item.to.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
