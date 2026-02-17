"use client"

import { Badge } from "@/components/ui/badge"

interface HistoryBlock {
  name: string
  duration: number
}

export interface HistoryEntry {
  date: string
  dayLabel: string
  startTime: string
  endTime: string
  totalMinutes: number
  mood: string
  blocks: HistoryBlock[]
}

interface HistoryListProps {
  entries: HistoryEntry[]
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function HistoryCard({ entry }: { entry: HistoryEntry }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-4 shadow-sm">
      {/* Date header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{entry.date}</h3>
          <span className="text-xs font-medium text-muted-foreground">{entry.dayLabel}</span>
        </div>
        <span className="text-2xl" role="img" aria-label="mood">
          {entry.mood}
        </span>
      </div>

      {/* Time range */}
      <div className="flex items-center gap-2 mb-4">
        <ClockIcon className="text-primary" />
        <span className="text-sm font-medium text-primary tabular-nums">
          {entry.startTime}{" → "}{entry.endTime}
        </span>
        <Badge variant="secondary" className="ml-auto rounded-full text-xs font-medium">
          {entry.totalMinutes}{"분"}
        </Badge>
      </div>

      {/* Block list */}
      <div className="flex flex-col gap-1.5">
        {entry.blocks.map((block, idx) => (
          <div key={idx} className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2">
            <div className="size-1.5 shrink-0 rounded-full bg-primary/60" />
            <span className="flex-1 text-sm text-foreground">{block.name}</span>
            <span className="text-xs font-medium text-muted-foreground tabular-nums">
              {block.duration}{"분"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* Sunrise illustration */}
      <div className="relative mb-6">
        <div className="flex size-20 items-center justify-center rounded-full bg-secondary">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v4" />
            <path d="m4.93 4.93 2.83 2.83" />
            <path d="M2 12h4" />
            <path d="m4.93 19.07 2.83-2.83" />
            <path d="M18 12h4" />
            <path d="m16.24 7.76 2.83-2.83" />
            <path d="M12 12a4 4 0 0 1 4 4" />
            <path d="M12 12a4 4 0 0 0-4 4" />
            <line x1="2" y1="20" x2="22" y2="20" />
          </svg>
        </div>
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">
        {"아직 기록이 없어요"}
      </h3>
      <p className="text-sm text-muted-foreground text-center">
        {"첫 루틴을 시작해보세요!"}
      </p>
    </div>
  )
}

export function HistoryList({ entries }: HistoryListProps) {
  if (entries.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="flex flex-col gap-3">
      {entries.map((entry, idx) => (
        <HistoryCard key={idx} entry={entry} />
      ))}
    </div>
  )
}
