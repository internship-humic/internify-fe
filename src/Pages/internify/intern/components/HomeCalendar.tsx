import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DEADLINES } from '../../../../lib/mockDeadline'


const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

const HomeCalendar = () => {
  const [today, setToday] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date())
    }, 60 * 1000) // update tiap 1 menit

    return () => clearInterval(interval)
  }, [])

  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(y => y - 1)
    } else {
      setCurrentMonth(m => m - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(y => y + 1)
    } else {
      setCurrentMonth(m => m + 1)
    }
  }

  const isToday = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear()

  const hasDeadline = (day: number) =>
    DEADLINES.some(d =>
      d.date.getDate() === day &&
      d.date.getMonth() === currentMonth &&
      d.date.getFullYear() === currentYear
    )

  const upcomingDeadlines = DEADLINES.filter(d => {
    return (
      d.date.getMonth() === currentMonth &&
      d.date.getFullYear() === currentYear
    );
  }).sort((a, b) => a.date.getTime() - b.date.getTime());

  // Previous month trailing days
  const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1 < 0 ? 11 : currentMonth - 1)
  const trailingDays = Array.from({ length: firstDay }, (_, i) => prevMonthDays - firstDay + 1 + i)

  // Current month days
  const currentDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Next month leading days
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7
  const leadingDays = Array.from({ length: totalCells - firstDay - daysInMonth }, (_, i) => i + 1)

  // Bold dates (weekends or special)
  const isBold = (day: number) => {
    const d = new Date(currentYear, currentMonth, day).getDay()
    return d === 0 || d === 6 // Sun or Sat
  }

  return (
    <div className=" px-13 py-5 border border-gray-200 rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </h2>
        <div className="flex items-center gap-1">
          <button
            onClick={prevMonth}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={nextMonth}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map(day => (
          <div key={day} className="text-center text-xs text-gray-400 font-medium py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {/* Trailing days from prev month */}
        {trailingDays.map(day => (
          <div key={`prev-${day}`} className="text-center py-2">
            <span className="text-xs text-gray-300">{day}</span>
          </div>
        ))}

        {/* Current month days */}
        {currentDays.map(day => (
          <div key={day} className="flex justify-center items-center py-0.5">
            {isToday(day) ? (
              <span className="w-8 h-7 flex items-center justify-center border-b-2 border-red-800 text-xs font-semibold">
                {day}
              </span>
            ) : (
              <span
                className={`w-full h-7 flex items-center justify-center text-xs
                  ${isBold(day) ? 'font-bold text-gray-800' : 'text-gray-700'}
                  ${hasDeadline(day) ? 'bg-red-800 text-white' : ''}
                  transition-colors`}
              >
                {day}
              </span>
            )}
          </div>
        ))}

        {/* Leading days from next month */}
        {leadingDays.map(day => (
          <div key={`next-${day}`} className="text-center py-2">
            <span className="text-xs text-gray-300">{day}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="my-3 border-gray-100" />

      {/* Upcoming Deadlines */}
      <div>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
          Upcoming Deadlines
        </p>
        {upcomingDeadlines.length > 0 ? (
          <ul className="flex flex-col gap-1">
            {upcomingDeadlines.map((d, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0" />
                <span className="text-xs text-gray-600">{d.label}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[11px] text-gray-400">No upcoming deadlines this month.</p>
        )}
      </div>
    </div>
  )
}

export default HomeCalendar