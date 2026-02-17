"use client"

const DAY_LABELS = ["월", "화", "수", "목", "금", "토", "일"]

interface DayData {
  label: string
  sessions: number
  isToday: boolean
}

function getWeekData(): DayData[] {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  const todayIdx = dayOfWeek === 0 ? 6 : dayOfWeek - 1

  // Sample data for the week (sessions per day)
  const sessionCounts = [1, 2, 0, 1, 3, 1, 0]

  return DAY_LABELS.map((label, idx) => ({
    label,
    sessions: sessionCounts[idx],
    isToday: idx === todayIdx,
  }))
}

export function WeeklyChart() {
  const data = getWeekData()
  const maxSessions = 3

  return (
    <div className="rounded-2xl bg-card border border-border p-4 shadow-sm">
      <h3 className="text-base font-semibold text-foreground mb-4">
        {"주간 활동"}
      </h3>

      <div className="flex items-end gap-0">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between h-[60px] mr-2 pb-0">
          {[3, 2, 1, 0].map((n) => (
            <span key={n} className="text-[10px] text-muted-foreground tabular-nums leading-none">
              {n}
            </span>
          ))}
        </div>

        {/* Bars */}
        <div className="flex flex-1 items-end justify-between">
          {data.map((day, idx) => {
            const barHeight =
              day.sessions > 0 ? (day.sessions / maxSessions) * 60 : 2

            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                {/* Bar container */}
                <div className="relative flex items-end h-[60px]">
                  {/* Grid lines */}
                  {[1, 2, 3].map((line) => (
                    <div
                      key={line}
                      className="absolute left-1/2 -translate-x-1/2 w-8 border-t border-dashed border-muted"
                      style={{ bottom: `${(line / maxSessions) * 100}%` }}
                    />
                  ))}

                  {/* Bar */}
                  <div
                    className={`relative z-10 w-8 rounded-t-md transition-all duration-300 ${
                      day.sessions > 0 ? "bg-primary" : "bg-muted"
                    } ${day.isToday ? "ring-2 ring-primary/40 ring-offset-1 ring-offset-card" : ""}`}
                    style={{ height: `${barHeight}px` }}
                  />
                </div>

                {/* Day label */}
                <span
                  className={`text-xs tabular-nums ${
                    day.isToday
                      ? "font-bold text-primary"
                      : "font-medium text-muted-foreground"
                  }`}
                >
                  {day.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
