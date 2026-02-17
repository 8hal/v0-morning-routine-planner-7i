"use client"

import { useState } from "react"
import { StatsCards } from "@/components/history/stats-cards"
import { BottomNav } from "@/components/bottom-nav"
import { WeekCalendar } from "@/components/history/week-calendar"
import { HistoryList, type HistoryEntry } from "@/components/history/history-list"

const SAMPLE_ENTRIES: HistoryEntry[] = [
  {
    date: "2026년 2월 17일",
    dayLabel: "화요일",
    startTime: "07:30",
    endTime: "09:05",
    totalMinutes: 95,
    mood: "\u{1F60A}",
    blocks: [
      { name: "명상", duration: 20 },
      { name: "스트레칭", duration: 10 },
      { name: "샤워", duration: 15 },
      { name: "아침식사", duration: 30 },
      { name: "뉴스 읽기", duration: 20 },
    ],
  },
  {
    date: "2026년 2월 16일",
    dayLabel: "월요일",
    startTime: "07:55",
    endTime: "09:00",
    totalMinutes: 65,
    mood: "\u{1F634}",
    blocks: [
      { name: "명상", duration: 15 },
      { name: "샤워", duration: 15 },
      { name: "아침식사", duration: 25 },
      { name: "준비", duration: 10 },
    ],
  },
  {
    date: "2026년 2월 15일",
    dayLabel: "일요일",
    startTime: "08:30",
    endTime: "09:30",
    totalMinutes: 60,
    mood: "\u{1F31E}",
    blocks: [
      { name: "명상", duration: 20 },
      { name: "요가", duration: 20 },
      { name: "브런치", duration: 20 },
    ],
  },
  {
    date: "2026년 2월 14일",
    dayLabel: "토요일",
    startTime: "09:00",
    endTime: "09:45",
    totalMinutes: 45,
    mood: "\u{1F60C}",
    blocks: [
      { name: "명상", duration: 15 },
      { name: "샤워", duration: 15 },
      { name: "아침식사", duration: 15 },
    ],
  },
  {
    date: "2026년 2월 12일",
    dayLabel: "목요일",
    startTime: "07:30",
    endTime: "08:35",
    totalMinutes: 65,
    mood: "\u{1F4AA}",
    blocks: [
      { name: "명상", duration: 15 },
      { name: "운동", duration: 20 },
      { name: "샤워", duration: 15 },
      { name: "아침식사", duration: 15 },
    ],
  },
]

const COMPLETED_DATES = [
  "2026-02-12",
  "2026-02-14",
  "2026-02-15",
  "2026-02-16",
  "2026-02-17",
]

export default function HistoryPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const filteredEntries = selectedDate
    ? SAMPLE_ENTRIES.filter((e) => {
        const match = e.date.match(/(\d{4})년 (\d{1,2})월 (\d{1,2})일/)
        if (!match) return false
        const key = `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}`
        return key === selectedDate
      })
    : SAMPLE_ENTRIES

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Status bar spacer */}
      <div className="h-12" />

      {/* Header */}
      <header className="px-4 pb-4">
        <h1 className="text-xl font-bold text-foreground">{"기록"}</h1>
      </header>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto px-4 pb-8">
        <div className="mx-auto flex w-full max-w-md flex-col gap-4">
          <StatsCards />
          <WeekCalendar
            completedDates={COMPLETED_DATES}
            selectedDate={selectedDate}
            onSelectDate={(d) =>
              setSelectedDate((prev) => (prev === d ? null : d))
            }
          />

          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              {selectedDate ? "선택한 날짜" : "최근 기록"}
            </h2>
            {selectedDate && (
              <button
                type="button"
                onClick={() => setSelectedDate(null)}
                className="text-xs font-medium text-primary"
              >
                {"전체 보기"}
              </button>
            )}
          </div>

          <HistoryList entries={filteredEntries} />
        </div>
      </main>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  )
}
