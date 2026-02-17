"use client"

import { Check, Clock, BarChart3 } from "lucide-react"

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="relative flex min-w-[140px] shrink-0 flex-col justify-between rounded-2xl bg-card border border-border p-4 shadow-sm h-[100px]">
      <div className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-secondary">
        {icon}
      </div>
      <div className="mt-auto flex flex-col gap-0.5">
        <span className="text-2xl font-bold tracking-tight text-primary tabular-nums">
          {value}
        </span>
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
    </div>
  )
}

export function StatsCards() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
      <StatCard
        icon={<Check className="size-4 text-primary" />}
        label="완료한 루틴"
        value="24"
      />
      <StatCard
        icon={<Clock className="size-4 text-primary" />}
        label="평균 소요시간"
        value="45분"
      />
      <StatCard
        icon={<BarChart3 className="size-4 text-primary" />}
        label="완료율"
        value="87%"
      />
    </div>
  )
}
