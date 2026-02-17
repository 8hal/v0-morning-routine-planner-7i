"use client"

import { Flame, Clock, Trophy } from "lucide-react"

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
}

function StatCard({ icon, label, value, sub }: StatCardProps) {
  return (
    <div className="flex min-w-[140px] shrink-0 flex-col gap-2 rounded-2xl bg-card border border-border p-4 shadow-sm">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <span className="text-3xl font-bold tracking-tight text-primary tabular-nums">
        {value}
      </span>
      {sub && (
        <span className="text-xs font-medium text-muted-foreground">{sub}</span>
      )}
    </div>
  )
}

export function StatsCards() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
      <StatCard
        icon={<Flame className="size-4 text-primary" />}
        label="이번 주"
        value="5회"
        sub="완료율 71%"
      />
      <StatCard
        icon={<Clock className="size-4 text-primary" />}
        label="평균 시간"
        value="62분"
      />
      <StatCard
        icon={<Trophy className="size-4 text-primary" />}
        label="연속 기록"
        value="3일"
      />
    </div>
  )
}
