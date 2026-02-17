"use client"

import { GreetingCard } from "@/components/morning/greeting-card"
import { AnchorTimeCard } from "@/components/morning/anchor-time-card"
import { BlockList } from "@/components/morning/block-list"
import { ChatInput } from "@/components/morning/chat-input"

export default function MorningRoutinePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Status bar spacer */}
      <div className="h-12" />

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="mx-auto flex w-full max-w-md flex-col gap-4">
          <GreetingCard />
          <AnchorTimeCard />
          <BlockList />

          {/* Start button */}
          <button
            type="button"
            className="w-full rounded-2xl bg-primary py-4 text-base font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-[0.98]"
          >
            {"이대로 시작"}
          </button>
        </div>
      </main>

      {/* Fixed chat input at bottom */}
      <div className="sticky bottom-0 border-t border-border bg-background/80 px-4 pb-8 pt-3 backdrop-blur-lg">
        <div className="mx-auto max-w-md">
          <ChatInput />
        </div>
      </div>
    </div>
  )
}
