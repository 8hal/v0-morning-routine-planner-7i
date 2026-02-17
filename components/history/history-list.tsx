"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
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
  commuteType: "office" | "home"
  satisfaction?: number
  energy?: number
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
  const commuteIcon = entry.commuteType === "home" ? "\uD83C\uDFE0" : "\uD83C\uDFE2"
  const commuteLabel = entry.commuteType === "home" ? "재택" : "출근"
  const blockNames = entry.blocks.map((b) => b.name).join(" \u00B7 ")

  return (
    <div className="rounded-2xl bg-card border border-border p-4 shadow-sm">
      {/* Row 1: Commute type + date + chevron */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg" role="img" aria-label={commuteLabel}>
          {commuteIcon}
        </span>
        <div className="flex-1">
          <span className="text-sm font-semibold text-foreground">{commuteLabel}</span>
          <span className="ml-2 text-xs font-medium text-muted-foreground">
            {entry.date}{" "}{entry.dayLabel}
          </span>
        </div>
        <ChevronRight className="size-4 text-muted-foreground/60" />
      </div>

      {/* Row 2: Time range + duration */}
      <div className="flex items-center gap-2 mb-3">
        <ClockIcon className="text-primary" />
        <span className="text-sm font-medium text-foreground tabular-nums">
          {entry.startTime}{" \u2192 "}{entry.endTime}
        </span>
        <span className="text-xs text-muted-foreground tabular-nums">
          {"("}{entry.totalMinutes}{"분)"}
        </span>
      </div>

      {/* Row 3: Block count + block names */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="secondary" className="rounded-full text-xs font-medium">
            {entry.blocks.length}{"개 블록"}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground pl-0.5">{blockNames}</p>
      </div>

      {/* Row 4: Satisfaction + Energy */}
      {(entry.satisfaction || entry.energy) && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {entry.satisfaction && (
            <span>{"\u2B50 "}{entry.satisfaction}{"/5"}</span>
          )}
          {entry.satisfaction && entry.energy && (
            <span className="mx-1">{"\u00B7"}</span>
          )}
          {entry.energy && (
            <span>{entry.mood}{" 에너지 "}{entry.energy}{"/5"}</span>
          )}
        </div>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* Calendar icon */}
      <div className="relative mb-6">
        <div className="flex size-[72px] items-center justify-center rounded-full bg-secondary">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">
        {"아직 완료한 루틴이 없어요"}
      </h3>
      <p className="text-sm text-muted-foreground text-center mb-6">
        {"첫 루틴을 시작해보세요!"}
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-[0.98]"
      >
        {"루틴 시작하기"}
      </Link>
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
