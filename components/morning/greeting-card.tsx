"use client"

import { Sun } from "lucide-react"

export function GreetingCard() {
  return (
    <div className="rounded-2xl bg-secondary p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">
            {"좋은 아침이에요!"}
          </h1>
          <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-card px-3 py-1 text-sm font-medium text-primary shadow-sm">
            <Sun className="size-4 text-amber-500" />
            <span>{"7:30 기상"}</span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {"어제보다 30분 일찍 일어나셨네요. 오늘 컨디션에 맞춰 루틴을 구성했어요."}
      </p>
    </div>
  )
}
