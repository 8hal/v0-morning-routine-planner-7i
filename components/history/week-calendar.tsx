"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface WeekCalendarProps {
  completedDates: string[]
  selectedDate: string | null
  onSelectDate: (date: string) => void
}

function getWeekDates(baseDate: Date): Date[] {
  const day = baseDate.getDay()
  const diff = day === 0 ? -6 : 1 - day
  const monday = new Date(baseDate)
  monday.setDate(baseDate.getDate() + diff)
  const dates: Date[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    dates.push(d)
  }
  return dates
}

function formatDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

const DAY_LABELS = ["월", "화", "수", "목", "금", "토", "일"]

export function WeekCalendar({ completedDates, selectedDate, onSelectDate }: WeekCalendarProps) {
  const [weekOffset, setWeekOffset] = useState(0)

  const baseDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + weekOffset * 7)
    return d
  }, [weekOffset])

  const weekDates = useMemo(() => getWeekDates(baseDate), [baseDate])

  const todayKey = formatDateKey(new Date())

  const weekLabel = useMemo(() => {
    const start = weekDates[0]
    const end = weekDates[6]
    return `${start.getMonth() + 1}월 ${start.getDate()}일 – ${end.getDate()}일`
  }, [weekDates])

  return (
    <div className="rounded-2xl bg-card border border-border p-4 shadow-sm">
      {/* Week header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setWeekOffset((p) => p - 1)}
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted transition-colors"
          aria-label="Previous week"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="text-sm font-semibold text-foreground">{weekLabel}</span>
        <button
          type="button"
          onClick={() => setWeekOffset((p) => Math.min(0, p + 1))}
          disabled={weekOffset >= 0}
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted transition-colors disabled:opacity-30"
          aria-label="Next week"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {weekDates.map((date, idx) => {
          const key = formatDateKey(date)
          const isCompleted = completedDates.includes(key)
          const isToday = key === todayKey
          const isSelected = key === selectedDate

          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectDate(key)}
              className="flex flex-col items-center gap-1 rounded-xl py-2 transition-all hover:bg-muted"
            >
              <span className="text-[10px] font-medium text-muted-foreground">
                {DAY_LABELS[idx]}
              </span>
              <span
                className={`flex size-9 items-center justify-center rounded-full text-sm font-semibold transition-all tabular-nums ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : isToday
                    ? "bg-secondary text-primary"
                    : "text-foreground"
                }`}
              >
                {date.getDate()}
              </span>
              {/* Completion dot */}
              <div className="h-1.5">
                {isCompleted && (
                  <div className="size-1.5 rounded-full bg-primary" />
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
