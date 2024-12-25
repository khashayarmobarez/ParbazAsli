import { useState, useEffect } from "react"
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export function TimePicker({ onChange }) {
  const [hour, setHour] = useState("00")
  const [minute, setMinute] = useState("00")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const now = new Date()
    setHour(now.getHours().toString().padStart(2, "0"))
    setMinute(now.getMinutes().toString().padStart(2, "0"))
  }, [])

  const handleTimeChange = (newHour, newMinute) => {
    setHour(newHour) // Updates the state
    setMinute(newMinute) // Updates the state
    if (onChange) {
      onChange(`${newHour}:${newMinute}`) // Calls the callback
    }
  }

  return (
    <div className="relative">
      <button
        className="flex items-center justify-start w-[280px] px-4 py-2 text-left font-normal border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AccessTimeIcon className="mr-2 h-5 w-5" />
        {hour}:{minute}
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-[280px] bg-white border rounded-md shadow-lg z-10">
          <div className="flex items-center justify-between p-4">
            <HourSelect value={hour} onChange={(value) => handleTimeChange(value, minute)} />
            <MinuteSelect value={minute} onChange={(value) => handleTimeChange(hour, value)} />
          </div>
        </div>
      )}
    </div>
  )
}

function HourSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-[120px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
        <option key={hour} value={hour.toString().padStart(2, "0")}>
          {hour.toString().padStart(2, "0")}
        </option>
      ))}
    </select>
  )
}

function MinuteSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-[120px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
        <option key={minute} value={minute.toString().padStart(2, "0")}>
          {minute.toString().padStart(2, "0")}
        </option>
      ))}
    </select>
  )
}

