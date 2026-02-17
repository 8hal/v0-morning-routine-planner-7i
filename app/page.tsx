"use client"

import { useState } from "react"
import { GreetingCard } from "@/components/morning/greeting-card"
import { AnchorTimeCard } from "@/components/morning/anchor-time-card"
import { BlockList } from "@/components/morning/block-list"
import { ChatInput } from "@/components/morning/chat-input"
import { TimerScreen } from "@/components/morning/timer-screen"
import { BottomNav } from "@/components/bottom-nav"

interface RoutineBlock {
  id: string
  name: string
  duration: number
}

const initialBlocks: RoutineBlock[] = [
  { id: "meditation", name: "명상", duration: 20 },
  { id: "shower", name: "샤워", duration: 15 },
  { id: "breakfast", name: "아침식사", duration: 30 },
]

export default function MorningRoutinePage() {
  const [view, setView] = useState<"planner" | "timer">("planner")
  const [blocks, setBlocks] = useState<RoutineBlock[]>(initialBlocks)

  if (view === "timer") {
    return <TimerScreen blocks={blocks} onBack={() => setView("planner")} />
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Status bar spacer */}
      <div className="h-12" />

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="mx-auto flex w-full max-w-md flex-col gap-4">
          <GreetingCard />
          <AnchorTimeCard />
          <BlockList blocks={blocks} onBlocksChange={setBlocks} />

          {/* Start button */}
          <button
            type="button"
            onClick={() => setView("timer")}
            disabled={blocks.length === 0}
            className="w-full rounded-2xl bg-primary py-4 text-base font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40"
          >
            {"이대로 시작"}
          </button>
        </div>
      </main>

      {/* Chat input above nav */}
      <div className="border-t border-border bg-background/80 px-4 pt-3 pb-3 backdrop-blur-lg">
        <div className="mx-auto max-w-md">
          <ChatInput />
        </div>
      </div>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  )
}
